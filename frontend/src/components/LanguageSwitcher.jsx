import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import Flag from 'react-world-flags';

export default function LanguageSwitcherNav() {
    const { language, changeLanguage } = useLanguage();

    return (
        <ButtonGroup aria-label="Language Switcher">
            <Button
                variant={language === 'en' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => changeLanguage('en')}
            >
                <Flag code="us" style={{ width: 15, marginRight: 5 }} /> EN
            </Button>
            <Button
                variant={language === 'ja' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => changeLanguage('ja')}
            >
                <Flag code="jp" style={{ width: 15, marginRight: 5 }} /> JP

            </Button>
        </ButtonGroup>
    );
}
