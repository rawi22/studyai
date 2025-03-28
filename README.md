# StudyAi - AI Education Platform

## Features
- Multilingual RTL/LTR support (Arabic/Hebrew)
- Book-based subject tutoring
- AI-powered chat assistance
- Student progress tracking

## Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm

### Backend (FastAPI)
```bash
cd studyai/server
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (React)
```bash
cd studyai/client
npm install
npm run dev
```

## Environment Variables
Create `.env` file from template:
```bash
cp .env.template .env
```
Update with your DeepSeek API key.

## Project Structure
```
studyai/
├── client/         # React frontend
├── server/         # FastAPI backend
├── public/         # Book images & translations
└── data/           # JSON storage