import React, { useState } from "react";
import "./Accessibility.css";
import logo from "./assets/accessibility_icon.png";

const Accessibility = ({ onOptionClick }) => {
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
    <div className="accessibility">
      <button className="accessibility-button" onClick={toggleMenu}>
        <img src={logo} alt="" className="accessibility-image" />
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
