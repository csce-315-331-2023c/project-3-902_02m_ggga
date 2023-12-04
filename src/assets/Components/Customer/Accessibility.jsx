// Accessibility.js

import React, { useState } from "react";
import "./Accessibility.css";

const Accessibility = ({ onOptionClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    toggleMenu(); // Close the menu after an option is clicked
    onOptionClick(option); // Execute the callback function from the parent
  };

  const accessibilityOptions = [
    { label: "Bigger Text", onClick: () => handleOptionClick("biggerText") },
    {
      label: "High Contrast",
      onClick: () => handleOptionClick("highContrast"),
    },
    { label: "Big Cursor", onClick: () => handleOptionClick("bigCursor") },
  ];

  return (
    <div>
      <button className="accessibility-button" onClick={toggleMenu}>
        Accessibility
      </button>

      {isMenuOpen && (
        <div className="accessibility-menu">
          {accessibilityOptions.map((option, index) => (
            <div
              key={index}
              className="accessibility-option"
              onClick={option.onClick}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accessibility;
