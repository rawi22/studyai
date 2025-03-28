import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMessageSquare, FiBook, FiChevronLeft } from 'react-icons/fi';

function MainApp() {
  const { t, i18n } = useTranslation();
  const [activeSubject, setActiveSubject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const subjects = t('onboarding.step2.subjects', { returnObjects: true });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Temporary mock response
    const newMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // TODO: Add API call
    const aiResponse = {
      text: "This is a mock AI response. API integration pending.",
      isUser: false,
      timestamp: new Date().toISOString()
    };

    setTimeout(() => {
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50 rtl:font-tajawal">
      {/* Sidebar */}
      <div className={`w-64 bg-white border-r transition-all
        ${i18n.language === 'ar' ? 'border-l' : 'border-r'}`}>
        
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {t('onboarding.step2.title')}
          </h2>
        </div>

        <div className="overflow-y-auto">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className="flex items-center w-full p-4 hover:bg-gray-50
                text-sm font-medium text-gray-700"
            >
              <FiBook className="mr-2" />
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeSubject && (
          <div className="p-4 border-b bg-white flex items-center">
            <button
              onClick={() => setActiveSubject(null)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold ml-2">
              {activeSubject}
            </h3>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xl p-4 rounded-lg ${
                msg.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border shadow-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('chat.placeholder')}
              className="flex-1 p-2 border rounded-lg focus:outline-none
                focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 transition-colors"
            >
              <FiMessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainApp;