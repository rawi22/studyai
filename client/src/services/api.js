import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const registerStudent = async (studentData) => {
  const response = await axios.post(`${API_BASE}/register-student`, studentData)
  return response.data
}

export const askGeneralQuestion = async (studentId, question) => {
  const response = await axios.post(`${API_BASE}/ask-general`, {
    student_id: studentId,
    question
  })
  return response.data
}

export const askSubjectQuestion = async (studentId, subject, question) => {
  const response = await axios.post(`${API_BASE}/ask-subject`, {
    student_id: studentId,
    subject,
    question
  })
  return response.data
}