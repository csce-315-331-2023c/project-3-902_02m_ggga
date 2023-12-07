import React, { useState, useEffect } from 'react';
import './Settings.css';

export const Settings = () => {
    const [largeText, setLargeText] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    // useEffect hook to apply the high contrast mode to the body of the document
    useEffect(() => {
        document.body.classList.toggle('high-contrast', highContrast);
    }, [highContrast]); // This will run every time highContrast changes

    return (
        <div className={`centered-container-settings ${largeText ? 'large-text' : ''}`}>
            <h1>Settings</h1>

            <div className="settings-section">
                <h2>Contrast</h2>
                <button onClick={() => setHighContrast(true)}>High Contrast</button>
                <button onClick={() => setHighContrast(false)}>Default Contrast</button>
            </div>

            <div className="settings-section">
                <h2>Font Size</h2>
                <button onClick={() => setLargeText(true)}>Large</button>
                <button onClick={() => setLargeText(false)}>Default</button>
            </div>

            <div className="settings-section">
                <h2>Language Settings</h2>
                {/* Language settings section */}
            </div>
        </div>
    );
};

export default Settings;
    