import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ compact = false }) => {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.split('-')[0] || 'en';

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="cursor-target flex items-center gap-2">
      {/* compact renders small toggle for navbar */}
      {compact ? (
        <div className="flex gap-1">
          <button
            onClick={() => changeLang('en')}
            className={`px-2 py-1 rounded ${current === 'en' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            aria-label={t('language.english')}
          >
            EN
          </button>
          <button
            onClick={() => changeLang('fr')}
            className={`px-2 py-1 rounded ${current === 'fr' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            aria-label={t('language.french')}
          >
            FR
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{t('language.switcher')}</span>
          <select
            value={current}
            onChange={(e) => changeLang(e.target.value)}
            className="px-3 py-2 rounded bg-transparent border"
            aria-label={t('language.switcher')}
          >
            <option value="en">{t('language.english')}</option>
            <option value="fr">{t('language.french')}</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
