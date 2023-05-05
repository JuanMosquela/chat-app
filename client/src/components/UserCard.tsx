import User from "../types/user";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import noProfile from "../assets/user.png";
import { setChat } from "../redux/slices/chat.slice";
import { useCreateConversationMutation } from "../redux/api/conversationApi";
import { selectTheme } from "../redux/slices/theme.slice";

interface UserProps {
  user: User;
  chat?: any;
  selectedChat: any;
}

const UserCard = ({ user, chat, selectedChat }: UserProps) => {
  const { id } = useSelector(selectAuth);
  const { theme, backgroundColor, headingColor, textColor } =
    useSelector(selectTheme);
  const dispatch = useDispatch();

  const [createConversation, { data }] = useCreateConversationMutation();

  const handleFunction = (userId: string) => {
    if (chat?._id) {
      dispatch(setChat({ user, currentChatId: chat._id }));
    } else {
      const body = {
        from: id,
        to: userId,
      };
      createConversation(body);
    }
  };

  return (
    <li
      key={user._id}
      onClick={() => handleFunction(user._id)}
      className={`flex items-center px-4 gap-4 cursor-pointer    rounded-md ${backgroundColor} ${textColor} ${
        theme == "light" ? `hover:bg-gray` : "hover:bg-[#222E35]"
      }  ${user._id === selectedChat && "bg-[#2A3942] hover:bg-[#2A3942]"}`}
    >
      <img
        className="rounded-full w-[45px]"
        src={user?.picture ? user.picture : noProfile}
        alt={user.username}
      />
      <div className=" h-[70px] w-full flex flex-col justify-between">
        <div>
          <h3 className=" pt-3">{user.username}</h3>
          <p className={`${textColor}`}>{user.email}</p>
        </div>

        <hr
          className={`w-full ${
            theme == "light" ? "text-gray" : "text-soft_dark"
          } `}
        />
      </div>
    </li>
  );
};
export default UserCard;
