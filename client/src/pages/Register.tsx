import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Loader from "../components/Loader";
import GoogleLoginButtom from "../components/GoogleLoginButtom";
import { registerSchemas } from "../schemas/registerSchema";

import { useSingUpMutation } from "../redux/api/authApi";
import { selectAuth, setCredentials } from "../redux/slices/auth.slice";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [signUp, { data, error, isLoading }] = useSingUpMutation();

  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();

  //   const [signIn, { data, isLoading, error, isSuccess }] = useSingInMutation();

  //   console.log(data, error);

  const onSubmit = async () => {
    try {
      await signUp(values);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(error);
    if (data?.token) {
      dispatch(setCredentials(data));
      console.log(data);
      navigate("/");
    }
  }, [data, error]);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: registerSchemas,
      onSubmit,
    });

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-blue  ">
      <div className="flex  rounded-lg overflow-hidden relative   shadow-md ">
        <form
          className="w-[400px] bg-white py-4 px-5 space-y-5 "
          method="post"
          onSubmit={handleSubmit}
        >
          <Link
            className="block  text-center py-1  font-bold uppercase text-sm md:text-md lg:text-3xl text-black mb-10  "
            to="/"
          >
            {/* <img className="mb-6" src={logo} alt="" /> */}
          </Link>
          <h2 className="text-letter text-2xl mb-8 font-semibold">Sign Up</h2>
          <div className=" mb-6 ">
            <input
              className=" w-full p-3 text-md outline-none bg-gray   text-letter rounded-md  "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              type="text"
              name="username"
              placeholder="Username"
            />
            {errors.username && touched.username && (
              <p className="pt-2 ml-2 text-red text-sm font-semibold">
                {errors.username}
              </p>
            )}
          </div>
          <div className=" mb-6 ">
            <input
              className=" w-full p-3 text-md outline-none bg-gray   text-letter rounded-md  "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              type="text"
              name="email"
              placeholder="Email"
            />
            {errors.email && touched.email && (
              <p className="pt-2 ml-2 text-red text-sm font-semibold">
                {errors.email}
              </p>
            )}
          </div>
          <div className=" mb-6 ">
            <div className="flex px-2 justify-between bg-gray hover:bg-gray/80 focus:bg-white items-center">
              <input
                className=" w-full p-3 text-md outline-none bg-gray   text-letter rounded-md  "
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              {visible ? (
                <AiFillEyeInvisible
                  className="  text-2xl text-dark/90 "
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <AiFillEye
                  className=" text-2xl text-dark/90"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
            {errors.password && touched.password && (
              <p className="pt-2 ml-2 text-red text-sm font-semibold">
                {errors.password}
              </p>
            )}
          </div>

          <Loader />
          <div className=" text-center">
            <p className="text-sm font-semibold   mb-2">
              or signup with google
            </p>

            <GoogleLoginButtom />
          </div>

          <div className="flex justify-center gap-2 text-sm font-semibold pt-10 text-center ">
            <p className="text-letter  font-semibold">
              already have an account?
              <br />
            </p>
            <Link
              className="text-blue text-md font-bold capitalize"
              to="/register"
            >
              sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
