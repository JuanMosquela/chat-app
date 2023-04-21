/* eslint-disable no-undef */ // Ignorar el error de que "google" no está definido
// Aquí puedes colocar el código que accede a la API de Google
import { useEffect } from "react";

const GoogleLoginButtom = () => {
  function handleCallbackResponse(response: any) {
    const body = { id_token: response.credential };
    fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const { token } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("email", response.user.email);
      })

      .catch((err) => console.warn(err));
  }

  const logoutGoogle = () => {
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem("email"), () => {
      localStorage.clear();
      location.reload();
    });
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "525882776971-5d7vpp4ptsl894bvp8mer96mr3sv64j8.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signIn"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <button>
      <div className="w-64" id="signIn"></div>
      <div className="w-64" id="signOut" onClick={logoutGoogle}>
        Logout
      </div>
    </button>
  );
};
export default GoogleLoginButtom;
