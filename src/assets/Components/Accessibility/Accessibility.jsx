import React, { useState, useEffect } from "react";
import "./Accessibility.css";
/**
 * used to effect the website through an accessibity menu available on most pages
 * @param {*} onOptionClick  takes in the information regarding the location and if accessibility is open
 * @returns accessibility options in a drop down menu.
 */
export const Accessibility = ({ onOptionClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  /**
   * used to open and closee the menu
   */
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  /**
   * closes menu and handles accessibity options
   * @param {*} option defines what accessibity feature is selected by the user
   */
  const handleOptionClick = (option) => {
    toggleMenu();
    onOptionClick(option);
  };

  /**
   * creates accessibilty options for the menu. must be in the form of {label, javascript function}
   */
  const accessibilityOptions = [
    { label: "Bigger Text", onClick: () => handleOptionClick("biggerText") },
    {
      label: "High Contrast",
      onClick: () => handleOptionClick("highContrast"),
    },
    { label: "Legible Text", onClick: () => handleOptionClick("legibleText") },
    { label: "Translate" },
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
