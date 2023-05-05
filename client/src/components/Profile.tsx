import { useEffect, useState } from "react";
import { BsArrowLeftShort, BsFillCameraFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import { MdModeEditOutline } from "react-icons/md";
import { selectTheme } from "../redux/slices/theme.slice";
import { useEditUserInfoMutation, useGetUserQuery } from "../redux/api/userApi";

interface ProfileProps {
  open: any;
  handleOpen: (state: boolean, mode: string) => void;
}

const Profile = ({ open, handleOpen }: ProfileProps) => {
  const { id } = useSelector(selectAuth);
  const { data, isSuccess } = useGetUserQuery(id);
  const [editUserInfo] = useEditUserInfoMutation();

  const { headingColor, textColor, backgroundColor } = useSelector(selectTheme);

  const [readOnly, setReadOnly] = useState(true);
  const [editingInput, setEditingInput] = useState("");

  const [inputValues, setInputValues] = useState({
    username: data?.username,
    description: data?.description,
  });

  const [file, setFile] = useState("");

  const handleReadInputs = (value: string) => {
    setReadOnly(false);
    setEditingInput(value);
  };

  const handleSubmitInputs = (e: any) => {
    try {
      const formData = new FormData();

      console.log(inputValues);

      for (const value of Object.entries(inputValues)) {
        console.log(value[0], value[1]);
        formData.append(value[0], value[1]);
      }

      if (file) {
        formData.append("picture", file);
      }

      editUserInfo(formData);
    } catch (error) {
      console.log(error);
    }
    setReadOnly(true);
  };

  useEffect(() => {
    if (data) {
      setInputValues({
        username: data?.username,

        description: data?.description || "Write somethin about you",
      });
    }
  }, [isSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div
      className={`flex flex-col pr-2 absolute w-full ${backgroundColor} top-0 gap-2 bottom-0 duration-200 delay-100 ${
        open.state && open.mode == "profile" ? "mr-[100%]  " : "ml-[-100%] "
      }  text-white   `}
    >
      <div
        className={` flex items-center gap-4 h-20 ${headingColor} ${textColor} rounded-l-md`}
      >
        <BsArrowLeftShort
          className="text-4xl cursor-pointer"
          onClick={() => handleOpen(false, "profile")}
        />
        <h1 className={`font-bold text-xl capitalize`}>profile</h1>
      </div>
      <div className="flex justify-center items-center w-full h-[300px]">
        <figure className="relative w-[280px] h-[280px] ">
          <img
            className={`
              
             w-[280px] h-[280px] object- transform rounded-full  transition-transform duration-4000 delay-3000`}
            src={data?.picture}
            alt={data?.username}
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-dark  bg-opacity-40  opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="relative h-[80px] w-[240px] flex justify-center items-center cursor-pointer">
              <input
                type="file"
                onChange={(e) => {
                  handleFile(e);
                  handleSubmitInputs(e);
                }}
                className="text-white text-center uppercase relative z-20 h-full w-full  "
              />
              <button className="absolute top-0 left-0 w-full ">
                <BsFillCameraFill className="text-4xl mb-2 m-auto" />
                <p>
                  Cambiar foto <br /> de perfil
                </p>{" "}
              </button>
            </div>
          </div>
        </figure>
      </div>
      <div className="p-8 space-y-6">
        <h3 className=" text-[#008069] ">Your name</h3>
        <div className={` ${textColor} flex justify-between gap-2 `}>
          <input
            type="text"
            name="username"
            readOnly={readOnly}
            autoFocus={!readOnly}
            className={`${backgroundColor} p-1 w-full outline-none  ${
              !readOnly &&
              editingInput == "username" &&
              "border-b-2 border-b-[#23C861]"
            }`}
            value={inputValues.username}
            onChange={handleChange}
          />
          {!readOnly && editingInput == "username" ? (
            <AiOutlineCheck onClick={handleSubmitInputs} />
          ) : (
            <MdModeEditOutline onClick={() => handleReadInputs("username")} />
          )}
        </div>
        <h3 className=" text-[#008069] ">Info</h3>
        <div className={` ${textColor} flex justify-between gap-2 `}>
          <textarea
            name="description"
            className={`${backgroundColor} p-1 w-full outline-none resize-none ${
              !readOnly &&
              editingInput == "description" &&
              "border-b-2 border-b-[#23C861]"
            } `}
            value={inputValues.description}
            onChange={handleChange}
          />
          {!readOnly && editingInput == "description" ? (
            <AiOutlineCheck onClick={handleSubmitInputs} />
          ) : (
            <MdModeEditOutline
              onClick={() => handleReadInputs("description")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
