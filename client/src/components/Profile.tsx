import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import { MdModeEditOutline } from "react-icons/md";

interface ProfileProps {
  open: any;
  handleOpen: (state: boolean, mode: string) => void;
}

const Profile = ({ open, handleOpen }: ProfileProps) => {
  const { username, picture, email } = useSelector(selectAuth);
  const [inputValues, setInputValues] = useState({
    username,
    picture,
    description: "Write somethin about you",
  });

  const handleChange = (e: any) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  console.log(inputValues);

  return (
    <div
      className={`flex flex-col pr-2 absolute w-full bg-dark top-0 gap-2 bottom-0 duration-200 delay-100 ${
        open.state && open.mode == "profile" ? "mr-[100%]  " : "ml-[-100%] "
      }  text-white   `}
    >
      <div className=" flex items-center gap-4 h-20 bg-soft_dark rounded-l-md">
        <BsArrowLeftShort
          className="text-4xl cursor-pointer"
          onClick={() => handleOpen(false, "profile")}
        />
        <h1 className="font-bold text-xl capitalize">profile</h1>
      </div>
      <figure className="flex justify-center items-center w-full  h-[200px]">
        <img
          className="rounded-full h-[180px] object-contain "
          src={picture}
          alt={username}
        />
      </figure>
      <div className="p-8 space-y-6">
        <h3 className="text-white text-[#008069] ">Your name</h3>
        <div className="flex justify-between ">
          <input
            type="text"
            name="username"
            className="bg-dark w-full outline-none text-white/70"
            value={inputValues.username}
            onChange={handleChange}
          />
          <MdModeEditOutline />
        </div>
        <h3 className="text-white text-[#008069] ">Info</h3>
        <div className="flex justify-between ">
          <input
            type="text"
            name="description"
            className="bg-dark w-full outline-none text-white/70"
            value={inputValues.description}
            onChange={handleChange}
          />
          <MdModeEditOutline />
        </div>
      </div>
    </div>
  );
};

export default Profile;
