import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'

// Temporary book data - should be replaced with API call
const BOOKS_BY_SUBJECT = {
  'رياضيات': [
    { id: 1, title: 'الرياضيات الأساسية', image: '/books/math-arabic-1.jpg' },
    { id: 2, title: 'الجبر المتقدم', image: '/books/math-arabic-2.jpg' }
  ],
  'מתמטיקה': [
    { id: 1, title: 'מתמטיקה בסיסית', image: '/books/math-hebrew-1.jpg' },
    { id: 2, title: 'אלגברה מתקדמת', image: '/books/math-hebrew-2.jpg' }
  ]
}

const OnboardingStep3 = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [selectedBooks, setSelectedBooks] = useState({})

  const handleBookToggle = (subject, bookId) => {
    setSelectedBooks(prev => ({
      ...prev,
      [subject]: prev[subject]?.includes(bookId)
        ? prev[subject].filter(id => id !== bookId)
        : [...(prev[subject] || []), bookId]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Transform selections into {subject: [bookIds]} format
    const selections = Object.entries(selectedBooks).reduce((acc, [subject, books]) => {
      acc[subject] = books
      return acc
    }, {})

    // TODO: Connect to backend API
    navigate('/app', { state: { selections } })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {t('onboarding.step3.title')}
      </h1>

      {state?.subjects.map((subject) => (
        <div key={subject} className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {t('onboarding.step3.select_books', { subject })}
          </h2>
          
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 
            ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            
            {BOOKS_BY_SUBJECT[subject]?.map((book) => (
              <button
                type="button"
                key={book.id}
                onClick={() => handleBookToggle(subject, book.id)}
                className={`relative group border-2 rounded-lg overflow-hidden
                  transition-all duration-200 ${
                    selectedBooks[subject]?.includes(book.id)
                      ? 'border-blue-600 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-400'
                  }`}
              >
                <img 
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 bg-white/90 backdrop-blur-sm">
                  <p className="text-sm font-medium text-gray-800">{book.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md
          hover:bg-blue-700 transition-colors"
      >
        {t('onboarding.step3.confirm')}
      </button>
    </div>
  )
}

export default OnboardingStep3