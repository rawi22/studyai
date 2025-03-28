import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const OnboardingStep1 = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        school: '',
        grade: '',
        language: 'ar'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/step2')
    }

    const handleLanguageChange = (lang) => {
        setFormData({ ...formData, language: lang })
        i18n.changeLanguage(lang)
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {t('onboarding.step1.title')}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {t('onboarding.step1.name')}
                    </label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                {/* Repeat similar fields for city, school, and grade */}

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('onboarding.step1.language')}
                    </label>
                    <div className="mt-2 flex gap-4">
                        <button
                            type="button"
                            onClick={() => handleLanguageChange('ar')}
                            className={`px-4 py-2 rounded-md ${
                                formData.language === 'ar' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            العربية
                        </button>
                        <button
                            type="button"
                            onClick={() => handleLanguageChange('he')}
                            className={`px-4 py-2 rounded-md ${
                                formData.language === 'he' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            עברית
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {t('onboarding.step1.next')}
                </button>
            </form>
        </div>
    )
}

export default OnboardingStep1