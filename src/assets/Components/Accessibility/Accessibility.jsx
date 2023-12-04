import React, { useState } from "react";
import "./Accessibility.css";

export const Accessibility = ({ onOptionClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    toggleMenu();
    onOptionClick(option);
  };

  const accessibilityOptions = [
    { label: "Bigger Text", onClick: () => handleOptionClick("biggerText") },
    {
      label: "High Contrast",
      onClick: () => handleOptionClick("highContrast"),
    },
    { label: "Legible Text", onClick: () => handleOptionClick("legibleText") },
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