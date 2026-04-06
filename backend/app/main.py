from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from app.database import (
    users_collection, 
    hash_password, 
    verify_password, 
    create_access_token
)

app = FastAPI(title="HalimTek Academy API")

# --- 1. PYDANTIC SCHEMAS ---

class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Optional[str] = "student"

class LoginRequest(BaseModel):
    email: str
    password: str

class ApprovalRequest(BaseModel):
    email: str
    target_status: str  # e.g., "active" or "rejected"

# --- 2. PUBLIC ROUTES ---

@app.get("/")
async def root():
    return {"message": "Welcome to HalimTek Academy API", "status": "online"}

@app.post("/register")
async def register(user: UserRegister):
    # Check if user exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user document
    user_dict = {
        "full_name": user.full_name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role,
        "status": "pending",  # All new users start as pending
        "created_at": "2026-04-06"
    }
    
    await users_collection.insert_one(user_dict)
    return {"message": "Registration successful. Please wait for admin approval."}

@app.post("/login")
async def login(data: LoginRequest):
    user = await users_collection.find_one({"email": data.email})
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Security check: verify hashed password
    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Status check: only 'active' users can get a token
    if user.get("status") != "active":
        raise HTTPException(
            status_code=403, 
            detail=f"Login denied. Current status: {user.get('status')}"
        )

    # Generate JWT
    token = create_access_token({"sub": user["email"], "role": user.get("role")})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "name": user["full_name"],
            "role": user["role"]
        }
    }

# --- 3. ADMIN ROUTES (Approval) ---

@app.post("/admin/approve")
async def approve_user(approval: ApprovalRequest):
    """
    Manually approve or reject a student. 
    In the future, we will add a 'Depends' here to ensure ONLY you can call this.
    """
    result = await users_collection.update_one(
        {"email": approval.email},
        {"$set": {"status": approval.target_status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
        
    return {"message": f"User {approval.email} is now {approval.target_status}"}

@app.get("/admin/pending-users")
async def get_pending():
    """List all students waiting for HalimTek approval."""
    cursor = users_collection.find({"status": "pending"})
    users = await cursor.to_list(length=100)
    # Remove passwords from response
    for u in users:
        u.pop("password", None)
        u["_id"] = str(u["_id"])
    return users