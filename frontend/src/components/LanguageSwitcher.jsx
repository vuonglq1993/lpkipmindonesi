import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext'; // ✅ dùng hook đúng

export default function LanguageSwitcherNav() {
    const { language, changeLanguage } = useLanguage(); // ✅ Đúng rồi nè

    return (
        <ButtonGroup aria-label="Language Switcher">
            <Button
                variant={language === 'en' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => changeLanguage('en')}
            >
                🇺🇸
            </Button>
            <Button
                variant={language === 'ja' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => changeLanguage('ja')}
            >
                🇯🇵
            </Button>
        </ButtonGroup>
    );
}
