from pydantic import BaseModel

class TransactionCreate(BaseModel):
    description: str
    amount: float

class TransactionRead(TransactionCreate):
    id: int
