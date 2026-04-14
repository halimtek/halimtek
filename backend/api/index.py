import os
import random
import string
from datetime import datetime, timedelta
from typing import List, Optional
from dotenv import load_dotenv
import bcrypt 
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from jose import jwt
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi import FastAPI, HTTPException, status, BackgroundTasks

# --- CONFIGURATION ---
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY", "halim_secret_production_key")
ALGORITHM = "HS256"

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=465,                  
    MAIL_SERVER="smtp.gmail.com",
    MAIL_FROM_NAME="Halim Tek Core",
    MAIL_STARTTLS=False,             
    MAIL_SSL_TLS=True,               
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TIMEOUT=15,
)

app = FastAPI(title="HalimTek Engineering Core")

# --- CORS ORIGINS ---
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://halimtek.vercel.app",
    "https://adminhalimtek.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DB INIT ---
client = AsyncIOMotorClient(MONGO_URI)
db = client.halimtek_db

# --- SCHEMAS ---
class UserRegister(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    projectVision: str
    tracks: List[str]

class OTPVerify(BaseModel):
    email: EmailStr
    otp: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- UTILITIES ---
def get_password_hash(password: str):
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str):
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_enc = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_byte_enc, hashed_password_enc)

def generate_otp():
    return "".join(random.choices(string.digits, k=6))

async def send_system_mail_now(email: str, subject: str, body_html: str):
    try:
        message = MessageSchema(
            subject=subject,
            recipients=[email],
            body=body_html,
            subtype=MessageType.html
        )
        fm = FastMail(conf)
        await fm.send_message(message)
    except Exception as e:
        print(f"LOG: ❌ ERROR FOUND: {str(e)}")

# --- OTP & REGISTRATION ROUTES ---

@app.post("/register/request-otp")
async def request_otp(user: UserRegister, background_tasks: BackgroundTasks):
    # 1. Check if user already exists in main DB
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Identity already verified and registered.")

    otp = generate_otp()
    
    # 2. Store temporary registration data (expires in 10 mins)
    temp_user = {
        "fullName": user.fullName,
        "email": user.email,
        "password": get_password_hash(user.password),
        "projectVision": user.projectVision,
        "tracks": user.tracks,
        "otp": otp,
        "created_at": datetime.utcnow()
    }
    
    # Update or Insert temporary record
    await db.otp_temp.update_one(
        {"email": user.email},
        {"$set": temp_user},
        upsert=True
    )

    # 3. Email Template
    otp_html = f"""
    <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: monospace; border: 1px solid #1e293b; border-radius: 8px; text-align: center;">
        <h2 style="color: #2dd4bf;">> VERIFICATION_REQUIRED</h2>
        <p>Input the following passcode to initialize your Halim Tek profile:</p>
        <div style="font-size: 32px; letter-spacing: 10px; color: #2dd4bf; margin: 20px 0; font-weight: bold;">
            {otp}
        </div>
        <p style="color: #64748b; font-size: 12px;">This code expires in 10 minutes.</p>
    </div>
    """
    
    background_tasks.add_task(send_system_mail_now, user.email, "Halim Tek: Verification Code", otp_html)
    
    return {"message": "OTP sent to your email."}

@app.post("/register/verify-otp")
async def verify_otp(data: OTPVerify):
    # 1. Find the temp record
    temp_record = await db.otp_temp.find_one({"email": data.email})
    
    if not temp_record or temp_record["otp"] != data.otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP.")

    # 2. Create the real user in the main database
    new_user = {
        "full_name": temp_record["fullName"],
        "email": temp_record["email"],
        "password": temp_record["password"], # Already hashed
        "vision": temp_record["projectVision"],
        "tracks": temp_record["tracks"],
        "is_approved": False, # Still requires admin approval
        "status": "pending",
        "created_at": datetime.utcnow()
    }

    await db.users.insert_one(new_user)
    
    # 3. Cleanup: Delete the temp record
    await db.otp_temp.delete_one({"email": data.email})
    
    return {"message": "Identity verified. Application submitted for review."}

# --- LOGIN & ADMIN ROUTES (UNTOUCHED) ---

@app.post("/login")
async def login_session(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid access keys.")

    if not db_user.get("is_approved"):
        raise HTTPException(status_code=403, detail="Account pending admin approval.")

    token = jwt.encode({"sub": db_user["email"]}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "name": db_user["full_name"]}

@app.get("/admin/candidates")
async def get_candidates(status: str = "all"):
    query = {}
    if status != "all":
        query["status"] = status
    cursor = db.users.find(query)
    candidates = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        candidates.append(doc)
    return candidates

@app.patch("/admin/approve/{user_id}")
async def approve_user(user_id: str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user: 
        raise HTTPException(status_code=404, detail="User not found.")

    await db.users.update_one(
        {"_id": ObjectId(user_id)}, 
        {"$set": {"is_approved": True, "status": "active"}}
    )
    
    approval_html = f"""
    <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: monospace;">
        <h2 style="color: #10b981;">> ACCESS_GRANTED</h2>
        <p>Welcome to the core, {user['full_name']}.</p>
        <a href="https://halimtek.vercel.app/login" style="background-color: #10b981; color: #020617; padding: 12px 25px; text-decoration: none;">INITIALIZE_SESSION</a>
    </div>
    """
    await send_system_mail_now(user["email"], "Halim Tek: System Access Approved", approval_html)
    return {"message": "User activated."}