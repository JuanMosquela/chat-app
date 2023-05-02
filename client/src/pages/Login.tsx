import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { setCredentials } from "../redux/slices/authSliceRedux";

import { useFormik } from "formik";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginSchemas } from "../schemas/loginSchemas";
import Loader from "../components/Loader";
import GoogleLoginButtom from "../components/GoogleLoginButtom";

import { useSingInMutation } from "../redux/api/authApi";
import { selectAuth, setCredentials } from "../redux/slices/auth.slice";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();

  const [signIn, { data, isLoading, error, isSuccess }] = useSingInMutation();

  const onSubmit = async () => {
    try {
      await signIn(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.token) {
      dispatch(setCredentials(data));
    }
    // if (error) {
    //   toast.error(error?.data?.error);
    // }

    if (auth?.token) navigate(from);
  }, [isSuccess, error]);

  useEffect(() => {
    console.log(auth);
    if (auth.token) navigate(from);
  }, [auth]);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        identifier: "",
        password: "",
      },
      validationSchema: loginSchemas,
      onSubmit,
    });

  return (
    <div className="flex justify-center items-center min-h-[100vh]  px-2   ">
      <div className="bg-white w-[400px]  px-4 space-y-4 rounded-lg overflow-hidden relative    ">
        <form method="post" onSubmit={handleSubmit}>
          <Link
            className="block  text-center py-1  font-bold uppercase text-sm md:text-md lg:text-3xl text-black mb-10  "
            to="/"
          >
            {/* <img className="mb-6" src={logo} alt="" /> */}
          </Link>
          <h2 className=" text-2xl mb-8 font-semibold">Sign In</h2>
          <div className="relative mb-6 ">
            <input
              className=" w-full p-3 text-md outline-none bg-gray    rounded-md  "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.identifier}
              type="text"
              name="identifier"
              placeholder="Username or Email"
            />
            {errors.identifier && touched.identifier && (
              <p className="pt-2 ml-2 text-red text-sm font-semibold">
                {errors.identifier}
              </p>
            )}
          </div>
          <div className=" mb-6 ">
            <div className="flex px-2 justify-between bg-gray hover:bg-gray/80 focus:bg-white items-center">
              <input
                className=" w-full p-3 text-md outline-none bg-gray rounded-md  "
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
        </form>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-letter"></div>
          <span className="flex-shrink mx-4 ">OR</span>
          <div className="flex-grow border-t border-letter"></div>
        </div>
        <GoogleLoginButtom />
        <div className="flex  justify-center gap-2 text-sm font-semibold pt-10 text-center ">
          <p className=" mb-4 font-semibold">
            Dont have an account?
            <br />
          </p>
          <Link
            className="text-blue text-md font-bold capitalize"
            to="/register"
          >
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
