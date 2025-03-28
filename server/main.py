from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Student(BaseModel):
    name: str
    city: str
    school: str 
    grade: str
    language: str
    subjects: dict

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

@app.post("/register-student")
async def register_student(student: Student):
    student_data = student.dict()
    student_id = hash(student_data["name"] + student_data["school"])
    
    file_path = os.path.join(DATA_DIR, "students.json")
    
    try:
        with open(file_path, "r+") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = {}
            
            data[str(student_id)] = student_data
            
            f.seek(0)
            json.dump(data, f)
            f.truncate()
            
        return {"student_id": student_id}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask-general")
async def ask_general_question():
    return {"response": "General question endpoint - TODO: Implement AI integration"}

@app.post("/ask-subject")
async def ask_subject_question():
    return {"response": "Subject question endpoint - TODO: Implement book-based logic"}

@app.post("/quiz")
async def generate_quiz():
    return {"quiz": "Quiz endpoint - TODO: Implement quiz generation"}

@app.get("/progress/{student_id}")
async def get_progress(student_id: str):
    return {"progress": "Progress endpoint - TODO: Implement progress tracking"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)