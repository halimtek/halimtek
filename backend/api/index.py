# import os
# from datetime import datetime
# from typing import List, Optional
# from dotenv import load_dotenv
# import bcrypt 
# from bson import ObjectId
# from fastapi import FastAPI, HTTPException, status
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, EmailStr
# from motor.motor_asyncio import AsyncIOMotorClient
# from jose import jwt
# from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

# # --- CONFIGURATION ---
# load_dotenv()

# MONGO_URI = os.getenv("MONGO_URI")
# SECRET_KEY = os.getenv("SECRET_KEY", "halim_secret_production_key")
# ALGORITHM = "HS256"

# conf = ConnectionConfig(
#     MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
#     MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
#     MAIL_FROM=os.getenv("MAIL_FROM"),
#     MAIL_PORT=587,                  
#     MAIL_SERVER="smtp.gmail.com",
#     MAIL_FROM_NAME="Halim Tek Core",
#     MAIL_STARTTLS=True,             
#     MAIL_SSL_TLS=False,               
#     USE_CREDENTIALS=True,
#     VALIDATE_CERTS=True,
#     TIMEOUT=10,
# )

# # Vercel needs the 'app' variable to be accessible in api/index.py
# app = FastAPI(title="HalimTek Engineering Core")

# # --- CORS ORIGINS ---
# origins = [
#     "http://localhost:3000",
#     "http://localhost:3001",
#     "https://halimtek.vercel.app",
#     "https://adminhalimtek.vercel.app",
#     # "https://halimtek.is-a.dev",
#     # "https://halimtek.onrender.com",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- DB INIT ---
# client = AsyncIOMotorClient(MONGO_URI)
# db = client.halimtek_db

# # --- SCHEMAS ---
# class UserRegister(BaseModel):
#     fullName: str
#     email: EmailStr
#     password: str
#     projectVision: str
#     tracks: List[str]

# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str

# # --- UTILITIES ---
# def get_password_hash(password: str):
#     pwd_bytes = password.encode('utf-8')
#     salt = bcrypt.gensalt()
#     hashed = bcrypt.hashpw(pwd_bytes, salt)
#     return hashed.decode('utf-8')

# def verify_password(plain_password: str, hashed_password: str):
#     password_byte_enc = plain_password.encode('utf-8')
#     hashed_password_enc = hashed_password.encode('utf-8')
#     return bcrypt.checkpw(password_byte_enc, hashed_password_enc)

# async def send_system_mail_now(email: str, subject: str, body_html: str):
#     print("LOG: 1. Starting email function...") # This will show in Vercel logs
#     try:
#         message = MessageSchema(
#             subject=subject,
#             recipients=[email],
#             body=body_html,
#             subtype=MessageType.html
#         )
#         print("LOG: 2. Message created. Connecting to Gmail...")
#         fm = FastMail(conf)
        
#         await fm.send_message(message)
#         print(f"LOG: 3. ✅ SUCCESS! Email sent to {email}")
        
#     except Exception as e:
#         # This part catches the error and PRINTS it to the Vercel logs
#         print(f"LOG: ❌ ERROR FOUND: {str(e)}")

        
# # --- ROUTES ---

# @app.get("/")
# async def root():
#     return {"status": "Halim Tek Core Online", "version": "2.0.1", "environment": "Vercel Serverless"}

# @app.get("/api/health")
# async def health():
#     return {"status": "running"}

# @app.post("/register", status_code=201)
# async def register_candidate(user: UserRegister):
#     # 1. Check if identity exists
#     if await db.users.find_one({"email": user.email}):
#         raise HTTPException(status_code=400, detail="Identity already registered.")

#     # 2. Map full schema for MongoDB
#     new_user = {
#         "full_name": user.fullName,
#         "email": user.email,
#         "password": get_password_hash(user.password),
#         "vision": user.projectVision,
#         "tracks": user.tracks,
#         "is_approved": False,
#         "status": "pending",
#         "created_at": datetime.utcnow()
#     }

#     # 3. Save to Atlas
#     result = await db.users.insert_one(new_user)
    
#     # 4. Construct Email Template
#     pending_html = f"""
#     <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: 'Courier New', monospace; border: 1px solid #1e293b; border-radius: 8px; max-width: 600px; margin: auto;">
#         <h2 style="color: #2dd4bf; border-bottom: 1px solid #1e293b; padding-bottom: 15px;">> HALIM_TEK_ONBOARDING_INITIALIZED</h2>
#         <p>Greetings, <span style="color: #2dd4bf;">{user.fullName}</span>.</p>
#         <p>Your vision for {', '.join(user.tracks)} is under review by our lead engineers.</p>
#         <div style="background-color: #0f172a; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0;">
#             <p style="margin: 0; color: #f59e0b; font-weight: bold;">[SYSTEM_STATUS: PENDING_REVIEW]</p>
#         </div>
#         <footer style="margin-top: 40px; font-size: 12px; color: #334155; text-align: center;">
#             HALIM TEK CORE // 2026
#         </footer>
#     </div>
#     """
    
#     # 5. Send email (Awaiting specifically for Serverless)
#     await send_system_mail_now(user.email, "Halim Tek: Application Pending", pending_html)
    
#     return {"id": str(result.inserted_id), "message": "Protocol Initialized. Checking credentials."}

# @app.post("/login")
# async def login_session(user: UserLogin):
#     db_user = await db.users.find_one({"email": user.email})
#     if not db_user or not verify_password(user.password, db_user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid access keys.")

#     if not db_user.get("is_approved"):
#         raise HTTPException(status_code=403, detail="Account pending admin approval.")

#     token = jwt.encode({"sub": db_user["email"]}, SECRET_KEY, algorithm=ALGORITHM)
#     return {"access_token": token, "name": db_user["full_name"]}

# @app.get("/admin/candidates")
# async def get_candidates(status: str = "all"):
#     query = {}
#     if status != "all":
#         query["status"] = status
    
#     cursor = db.users.find(query)
#     candidates = []
#     async for doc in cursor:
#         doc["_id"] = str(doc["_id"]) # Convert ObjectId to string for JSON
#         candidates.append(doc)
#     return candidates

# @app.patch("/admin/approve/{user_id}")
# async def approve_user(user_id: str):
#     user = await db.users.find_one({"_id": ObjectId(user_id)})
#     if not user: 
#         raise HTTPException(status_code=404, detail="User not found.")

#     await db.users.update_one(
#         {"_id": ObjectId(user_id)}, 
#         {"$set": {"is_approved": True, "status": "active"}}
#     )
    
#     approval_html = f"""
#     <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: 'Courier New', monospace;">
#         <h2 style="color: #10b981;">> ACCESS_GRANTED</h2>
#         <p>Welcome to the core, {user['full_name']}.</p>
#         <p>Your session is ready for initialization.</p>
#         <a href="https://halimtek.vercel.app/login" style="background-color: #10b981; color: #020617; padding: 12px 25px; text-decoration: none; font-weight: bold;">INITIALIZE_SESSION</a>
#     </div>
#     """
    
#     await send_system_mail_now(user["email"], "Halim Tek: System Access Approved", approval_html)
  
#     return {"message": "User activated."}

import os
from datetime import datetime
from typing import List, Optional
from dotenv import load_dotenv
import bcrypt 
from bson import ObjectId
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from jose import jwt
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

# --- CONFIGURATION ---
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY", "halim_secret_production_key")
ALGORITHM = "HS256"

# Vercel-Optimized Mail Config (Port 465 is more stable for Serverless)
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
    TIMEOUT=15, # Increased for Gmail handshakes
)

app = FastAPI(title="HalimTek Engineering Core")

# --- CORS ORIGINS ---
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://halimtek.vercel.app",
    "https://adminhalimtek.vercel.app", # Replace with your actual admin URL
    # "https://halimtek.is-a.dev",
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

async def send_system_mail_now(email: str, subject: str, body_html: str):
    print(f"LOG: Attempting email to {email}...")
    try:
        message = MessageSchema(
            subject=subject,
            recipients=[email],
            body=body_html,
            subtype=MessageType.html
        )
        fm = FastMail(conf)
        await fm.send_message(message)
        print(f"LOG: ✅ SUCCESS! Email sent to {email}")
    except Exception as e:
        print(f"LOG: ❌ ERROR FOUND: {str(e)}")

        
# --- PUBLIC ROUTES ---

@app.get("/")
async def root():
    return {"status": "Halim Tek Core Online", "version": "2.0.1", "environment": "Vercel Serverless"}

@app.post("/register", status_code=201)
async def register_candidate(user: UserRegister):
    # 1. Check if identity exists
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Identity already registered.")

    # 2. Map full schema for MongoDB
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

    # 3. Construct Email Template (Done early to save execution time)
    pending_html = f"""
    <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: 'Courier New', monospace; border: 1px solid #1e293b; border-radius: 8px; max-width: 600px; margin: auto;">
        <h2 style="color: #2dd4bf; border-bottom: 1px solid #1e293b; padding-bottom: 15px;">> HALIM_TEK_ONBOARDING_INITIALIZED</h2>
        <p>Greetings, <span style="color: #2dd4bf;">{user.fullName}</span>.</p>
        <p>Your vision for {', '.join(user.tracks)} is under review by our lead engineers.</p>
        <div style="background-color: #0f172a; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0;">
            <p style="margin: 0; color: #f59e0b; font-weight: bold;">[SYSTEM_STATUS: PENDING_REVIEW]</p>
        </div>
        <footer style="margin-top: 40px; font-size: 12px; color: #334155; text-align: center;">
            HALIM TEK CORE // 2026
        </footer>
    </div>
    """
    
    # 4. Save to Atlas
    result = await db.users.insert_one(new_user)
    
    # 5. Send email (Awaiting specifically for Serverless)
    await send_system_mail_now(user.email, "Halim Tek: Application Pending", pending_html)
    
    return {"id": str(result.inserted_id), "message": "Protocol Initialized. Checking credentials."}

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
async def get_candidates(status: str = "all"):
    query = {}
    if status != "all":
        query["status"] = status
    
    cursor = db.users.find(query)
    candidates = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"]) # Convert ObjectId to string for JSON
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
    <div style="background-color: #020617; color: #f8fafc; padding: 40px; font-family: 'Courier New', monospace;">
        <h2 style="color: #10b981;">> ACCESS_GRANTED</h2>
        <p>Welcome to the core, {user['full_name']}.</p>
        <p>Your session is ready for initialization.</p>
        <a href="https://halimtek.vercel.app/login" style="background-color: #10b981; color: #020617; padding: 12px 25px; text-decoration: none; font-weight: bold;">INITIALIZE_SESSION</a>
    </div>
    """
    
    await send_system_mail_now(user["email"], "Halim Tek: System Access Approved", approval_html)
  
    return {"message": "User activated."}