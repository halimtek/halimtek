# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="HalimTek API")

# Allow your Vercel frontend to talk to this local/VPS backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your Vercel URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URL = os.getenv()
client = AsyncIOMotorClient(MONGO_URL)
db = client.halimtek_db

# Data Model for Validation
class ContactInquiry(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/")
async def root():
    return {"message": "HalimTek Backend is Online", "version": "1.0.0"}

@app.post("/contact")
async def save_inquiry(inquiry: ContactInquiry):
    try:
        new_inquiry = await db.inquiries.insert_one(inquiry.dict())
        return {"status": "success", "id": str(new_inquiry.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database Error")