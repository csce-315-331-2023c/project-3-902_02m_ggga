import React from 'react';
import './Settings.css';

export const Settings = () => {
    return (
        <div className='centered-container-settings'>
            <h1>Settings</h1>

            <div className="settings-section">
                <h2>Contrast</h2>
                <button>High Contrast</button>
                <button>Default Contrast</button>
            </div>

            <div className="settings-section">
                <h2>Font Size</h2>
                <button>Large</button>
                <button>Default</button>
            </div>

            <div className="settings-section">
                <h2>Language Settings</h2>
                {/* Replace buttons with a language selector component */}
                {/* Example: <LanguageSelector /> */}
            </div>
        </div>
    );
};
