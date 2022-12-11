import React, { useContext } from "react";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import ThemeContext from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="toggle-theme" type="button" onClick={toggleTheme}>
      {theme === "dark" ? <BsSun /> : <BsFillMoonFill />}
    </button>
  );
};

export default ThemeToggleButton;
