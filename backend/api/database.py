import os
import bcrypt
import jwt
import certifi
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# --- 1. CONFIGURATION ---
# Use a default string ONLY if .env is missing, but make it an Atlas-style string
DEFAULT_URL = "mongodb+srv://user:pass@cluster.mongodb.net/halimtek_db"
MONGO_URL = os.getenv("MONGO_URL", DEFAULT_URL)
# Validation: If the variable is missing (None), stop the server
if not MONGO_URL:
    raise ValueError("❌ ERROR: MONGO_URL not found in .env file. Check your variable names!")

DB_NAME = os.getenv("DB_NAME", "halimtek_db")

SECRET_KEY = os.getenv("JWT_SECRET", "HALIM_TEK_SECURE_2026")

# --- 2. THE CONNECTION ---
# We define the client globally
client = AsyncIOMotorClient(
    MONGO_URL,
    serverSelectionTimeoutMS=15000,
    tls=True,
    tlsCAFile=certifi.where(),
    retryWrites=True,
    w="majority"
)

# CRITICAL: We access the database and collection directly from THIS client
db = client[DB_NAME]
users_collection = db["users"]
contacts_collection = db["contacts"]

print(f"🚀 ENGINE ACTIVE | DB: {DB_NAME} | CLUSTER: {MONGO_URL.split('@')[-1].split('/')[0]}")

# --- 3. HELPERS ---
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")