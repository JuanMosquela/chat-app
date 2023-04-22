import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/auth.slice";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { FcGoogle } from "react-icons/fc";

declare const window: Window;

const GoogleLoginButtom = () => {
  const dispatch = useDispatch();
  // function handleCallbackResponse(response: any) {
  //   const body = { id_token: response.credential };
  //   fetch("http://localhost:5000/api/auth/google", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       const { token } = response;
  //       dispatch(setCredentials(response));
  //     })

  //     .catch((err) => console.warn(err));
  // }

  // const logoutGoogle = () => {
  //   google.accounts.id.disableAutoSelect();

  //   google.accounts.id.revoke(localStorage.getItem("email"), () => {
  //     localStorage.clear();
  //     location.reload();
  //   });
  // };

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id:
  //       "525882776971-5d7vpp4ptsl894bvp8mer96mr3sv64j8.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signIn"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      const auth = gapi.auth2.getAuthInstance();
      const id_token = auth.currentUser.get().getAuthResponse().id_token;
      console.log(id_token);

      fetch("https://chat-app-api-mba6.onrender.com/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id_token),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          const { token } = response;
          dispatch(setCredentials(response));
        })

        .catch((err) => console.warn(err));
    },
  });

  return (
    // <div className="flex justify-center">
    //   <GoogleLogin
    //     onSuccess={(response) => {
    //       console.log(response.credential);
    //       const body = { id_token: response.credential };

    //       fetch("http://localhost:5000/api/auth/google", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(body),
    //       })
    //         .then((response) => response.json())
    //         .then((response) => {
    //           console.log(response);
    //           const { token } = response;
    //           dispatch(setCredentials(response));
    //         })

    //         .catch((err) => console.warn(err));
    //     }}
    //     onError={() => {
    //       console.log("Login Failed");
    //     }}
    //   />
    // </div>
    <button
      className="w-full flex justify-center items-center gap-2 rounded-sm shadow-md p-4 "
      onClick={() => loginWithGoogle()}
    >
      <FcGoogle className="text-xl" />
      <span className="text-md">Sign in with google</span>
    </button>
  );
};
export default GoogleLoginButtom;
