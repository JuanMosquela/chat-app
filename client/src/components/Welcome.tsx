import Robot from "../assets/robot.gif";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import { selectTheme } from "../redux/slices/theme.slice";
export default function Welcome() {
  const { username } = useSelector(selectAuth);
  const { theme, headingColor } = useSelector(selectTheme);

  return (
    <div
      className={`flex-grow flex items-center justify-center  ${
        theme == "dark" ? `text-white ${headingColor} ` : "text-dark bg-gray"
      }`}
    >
      <div className="flex  flex-col justify-center items-center">
        <img className="h-[20rem]" src={Robot} alt="" />
        <h1 className="text-4xl mb-2">
          Welcome, <span className="text-[#23C861] font-bold">{username}!</span>
        </h1>
        <h3 className="text-xl">Please select a chat to Start messaging.</h3>
      </div>
    </div>
  );
}
