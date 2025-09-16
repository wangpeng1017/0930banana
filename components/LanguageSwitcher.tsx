import React from 'react';
import { useTranslation } from '../i18n/context';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="py-2 px-3 text-sm font-semibold text-gray-200 bg-gray-800/50 rounded-md hover:bg-gray-700/50 transition-colors duration-200"
      aria-label="Switch language"
    >
      {language === 'en' ? '中文' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
