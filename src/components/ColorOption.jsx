/* eslint-disable react/prop-types */

import { useState } from "react";

const ColorOption = ({ color, targetColor, onClick, disabled }) => {
  const [animationClass, setAnimationClass] = useState("");

  const handleClick = () => {
    const isCorrect = color === targetColor;
    setAnimationClass(isCorrect ? "fadeOut" : "shake");

    setTimeout(() => setAnimationClass(""), 600);
    onClick();
  };

  return (
    <button
      className={`color-option ${animationClass}`}
      style={{ backgroundColor: color || "#777" }}
      onClick={handleClick}
      disabled={disabled}
      data-testid="colorOption"
    />
  );
};

export default ColorOption;
