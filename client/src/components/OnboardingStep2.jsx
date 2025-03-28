import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const OnboardingStep2 = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [selectedSubjects, setSelectedSubjects] = useState([])

    const handleSubjectToggle = (subject) => {
        setSelectedSubjects(prev => 
            prev.includes(subject)
                ? prev.filter(s => s !== subject)
                : [...prev, subject]
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedSubjects.length === 0) return
        navigate('/step3', { state: { subjects: selectedSubjects } })
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {t('onboarding.step2.title')}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {t('onboarding.step2.subjects', { returnObjects: true }).map((subject) => (
                        <button
                            type="button"
                            key={subject}
                            onClick={() => handleSubjectToggle(subject)}
                            className={`p-4 rounded-lg border-2 transition-colors
                                ${selectedSubjects.includes(subject)
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-blue-400 text-gray-700'}`}
                        >
                            {subject}
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={selectedSubjects.length === 0}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                        hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {t('onboarding.step1.next')}
                </button>
            </form>
        </div>
    )
}

export default OnboardingStep2