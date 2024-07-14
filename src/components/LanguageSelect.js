import React from 'react';

const LanguageSelect = ({ language, onChange }) => (
    <select id="language-select" className="my-2 mx-2 px-4 py-1 border border-gray-300 rounded" value={language} onChange={onChange}>
        <option value="id-ID">Bahasa Indonesia</option>
        <option value="en-US">English</option>
        <option value="ja-JP">日本語 (Japanese)</option>
        {/* Add other languages as needed */}
    </select>
);

export default LanguageSelect;
