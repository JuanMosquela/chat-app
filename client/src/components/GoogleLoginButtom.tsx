import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/auth.slice";
import { useGoogleLogin } from "@react-oauth/google";

import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const GoogleLoginButtom = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        const { data } = await axios.post(
          import.meta.env.DEV
            ? "http://localhost:5000/api/auth/google"
            : "https://chat-app-api-mba6.onrender.com/api/auth/google",
          {
            id_token: res.data,
          }
        );

        if (data.token) {
          dispatch(setCredentials(data));
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      <button
        className="w-full flex justify-center items-center gap-2 rounded-sm shadow-md py-4 "
        onClick={() => login()}
      >
        <FcGoogle className="text-xl" />
        <span className="text-md">Sign in with google</span>
      </button>
    </div>
  );
};
export default GoogleLoginButtom;
