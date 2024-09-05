import React from "react";

const Button = ({ btnText, isDarkBtn = false }) => {
  let btnClassName = "border font-semibold py-2 px-5 rounded-3xl ";
  if (isDarkBtn) {
    btnClassName += "hover:bg-blue-900/75 bg-blue-900 text-white ";
  } else {
    btnClassName += "hover:border-gray-600 text-blue-900 border-gray-400 ";
  }
  return <button className={btnClassName}>{btnText}</button>;
};

export default Button;
