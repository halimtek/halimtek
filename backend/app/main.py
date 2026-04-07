import os
from datetime import datetime
from typing import List, Optional
from dotenv import load_dotenv
from bson import ObjectId
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from jose import jwt
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

# --- CONFIGURATION ---
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI") or os.getenv("MONGO_URL") 
SECRET_KEY = os.getenv("SECRET_KEY", "halim_secret_dev_key")
ALGORITHM = "HS256"

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,        
    MAIL_SSL_TLS=False,        
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

app = FastAPI(title="HalimTek Engineering Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DB INIT ---
client = AsyncIOMotorClient(MONGO_URI)
db = client.halimtek_db
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- SCHEMAS ---
class UserRegister(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    projectVision: str
    tracks: List[str]

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- UTILITIES ---
def get_password_hash(password): return pwd_context.hash(password)
def verify_password(p, h): return pwd_context.verify(p, h)

async def send_system_mail(email: str, subject: str, body_html: str):
    try:
        message = MessageSchema(
            subject=subject,
            recipients=[email],
            body=body_html,
            subtype=MessageType.html
        )
        fm = FastMail(conf)
        await fm.send_message(message)
        print(f"📧 Mail sent successfully to {email}")
    except Exception as e:
        print(f"⚠️ MAIL ERROR: {e}")

# --- PUBLIC ROUTES ---

@app.post("/register", status_code=201)
async def register_candidate(user: UserRegister):
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Identity already registered.")

    new_user = {
        "full_name": user.fullName,
        "email": user.email,
        "password": get_password_hash(user.password),
        "vision": user.projectVision,
        "tracks": user.tracks,
        "is_approved": False,
        "status": "pending",
        "created_at": datetime.utcnow()
    }

    result = await db.users.insert_one(new_user)
    
    # --- PENDING EMAIL TEMPLATE ---
    pending_html = f"""
    <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: 'Courier New', monospace; border: 1px solid #1e293b; border-radius: 8px; max-width: 600px; margin: auto;">
        <h2 style="color: #2dd4bf; border-bottom: 1px solid #1e293b; padding-bottom: 15px;">> HALIM_TEK_ONBOARDING_INITIALIZED</h2>
        <p style="font-size: 16px;">Greetings, <span style="color: #2dd4bf;">{user.fullName}</span>.</p>
        <p style="color: #94a3b8;">Your request has been received. Our engineering leads are currently reviewing your project vision.</p>
        <div style="background-color: #0f172a; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0;">
            <p style="margin: 0; color: #f59e0b; font-weight: bold;">[SYSTEM_STATUS: PENDING_REVIEW]</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b;">Target Tracks: {", ".join(user.tracks)}</p>
        </div>
        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b; font-size: 12px; color: #334155; text-align: center;">
            HALIM TEK CORE // ADDIS ABABA // 2026
        </footer>
    </div>
    """
    await send_system_mail(user.email, "Halim Tek: Application Pending", pending_html)
    
    return {"id": str(result.inserted_id), "message": "Onboarding started."}

@app.get("/system/fix-db")
async def fix_db():
    # Update users with is_approved=True to status='active'
    await db.users.update_many({"is_approved": True}, {"$set": {"status": "active"}})
    # Update users with is_approved=False to status='pending'
    await db.users.update_many({"is_approved": False}, {"$set": {"status": "pending"}})
    return {"message": "Database statuses synchronized."}

@app.post("/login")
async def login_session(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid access keys.")

    if not db_user.get("is_approved"):
        raise HTTPException(status_code=403, detail="Account pending admin approval.")

    token = jwt.encode({"sub": db_user["email"]}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "name": db_user["full_name"]}

# --- ADMIN ROUTES ---

@app.get("/admin/candidates")
async def get_candidates(status: Optional[str] = "pending"):
    # If status is "all", we send an empty query {} to MongoDB to get EVERYONE
    if status == "all":
        query = {}
    else:
        query = {"status": status}
    
    cursor = db.users.find(query)
    users = await cursor.to_list(length=100)
    
    # Ensure the _id is converted to a string for React
    for u in users: 
        u["_id"] = str(u["_id"])
        # Important: Ensure 'status' field exists so the frontend can filter it
        if "status" not in u:
            u["status"] = "active" if u.get("is_approved") else "pending"
            
    return users

@app.patch("/admin/approve/{user_id}")
async def approve_user(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid ID format.")

    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if user.get("is_approved") is True:
        return {"message": "User protocol is already active. No action taken."}

    await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"is_approved": True, "status": "active"}}
    )
    
    # --- APPROVAL EMAIL TEMPLATE ---
    approval_html = f"""
    <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: 'Courier New', monospace; border: 1px solid #10b981; border-radius: 8px; max-width: 600px; margin: auto;">
        <h2 style="color: #10b981; border-bottom: 1px solid #1e293b; padding-bottom: 15px;">> ACCESS_GRANTED_SUCCESSFULLY</h2>
        <p style="font-size: 16px;">Welcome to the core, <span style="color: #10b981;">{user['full_name']}</span>.</p>
        <p style="color: #94a3b8;">Your engineering environment is now active. Security clearance has been granted.</p>
        <div style="text-align: center; margin: 35px 0;">
            <a href="http://localhost:3000/login" style="background-color: #10b981; color: #020617; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">INITIALIZE_SESSION</a>
        </div>
        <div style="background-color: #0f172a; padding: 15px; border-radius: 4px; border: 1px solid #334155; font-size: 12px; color: #64748b;">
            LOG: Status changed to 'ACTIVE' | REF: {user_id}
        </div>
    </div>
    """
    await send_system_mail(user["email"], "Halim Tek: System Access Approved", approval_html)
    
    return {"message": f"User {user['email']} activated and notified."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)