import { FaSun, FaMoon } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { changeTheme, selectTheme } from "../redux/slices/theme.slice";
import { useState } from "react";

const ThemeColor = () => {
  const { theme, textColor } = useSelector(selectTheme);
  const [themeColor, setThemeColor] = useState("dark");
  const dispatch = useDispatch();

  const handleTheme = () => {
    if (themeColor == "dark") {
      setThemeColor("light");

      dispatch(
        changeTheme({
          theme: "light",
          backgroundColor: "bg-white",
          textColor: "text-dark",
          headingColor: "bg-light_heading",
          background: "bg-background_light",
          messageMe: "bg-light_color_msg_me",
          messageAll: "bg-light_color_msg_all",
        })
      );
    } else {
      setThemeColor("dark");
      dispatch(
        changeTheme({
          theme: "dark",
          backgroundColor: "bg-dark",
          textColor: "text-white",
          headingColor: "bg-dark_heading",
          background: "bg-background_dark",
          messageMe: "bg-dark_color_msg_me",
          messageAll: "bg-dark_color_msg_all",
        })
      );
    }
  };
  return (
    <div className={`${textColor} cursor-pointer`} onClick={handleTheme}>
      {theme == "dark" ? <FaSun /> : <FaMoon />}
    </div>
  );
};
export default ThemeColor;
