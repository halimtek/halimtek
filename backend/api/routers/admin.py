from fastapi import APIRouter, Depends, HTTPException
from ..database import user_collection
from bson import ObjectId

router = APIRouter(prefix="/admin", tags=["admin"])

# 1. Get all users waiting for approval
@router.get("/pending-users")
async def get_pending_users():
    cursor = user_collection.find({"status": "pending"})
    users = []
    async for user in cursor:
        users.append({
            "id": str(user["_id"]),
            "full_name": user["full_name"],
            "email": user["email"],
            "created_at": user["created_at"]
        })
    return users

# 2. Approve a user (Change status to 'active')
@router.patch("/approve/{user_id}")
async def approve_user(user_id: str):
    result = await user_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"status": "active", "is_paid": True}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Access Granted. User is now Active."}