import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export const Translate = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Your page content... */}
      <p>Hello to translate portion</p>

      {/* Google Translate button */}
      <div id="google_translate"></div>

      {/* Helmet for setting meta tag to avoid automatic translation by Google Translate */}
      <Helmet>
        <meta name="google" content="notranslate" />
      </Helmet>
    </div>
  );
};

export default Translate;
