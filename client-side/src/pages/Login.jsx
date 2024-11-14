import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
//import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { handleSuccess, handleError } from "../utils";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { updateUser } = useContext(AuthContext);
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  const handleChange = () => {
    setloginInfo({
      email: email.current.value,
      password: password.current.value,
    });

    console.log(loginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      console.log("all feilds are required");
    }
    try {
      const response = await axios.post(
        "https://news-website-1-g52y.onrender.com",
        loginInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message, token, error, username } = response.data;

      console.log(message);

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", username);
        setTimeout(() => {
          navigate("/");
          updateUser();
        }, 2000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details || message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message || "An error occured");
      console.log("error while signin", error);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <section className="h-[70vh]  flex mt-7">
      <form
        className="bg-white p-10 max-w-md mx-auto h-[21rem] shadow-xl shadow-gray-500"
        onSubmit={handleLogin}
      >
        <p className="mb-2 text-3xl font-semibold text-gray-700">Sign In</p>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            onChange={handleChange}
            ref={email}
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            onChange={handleChange}
            ref={password}
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>

          <button
            type="submit"
            className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm mr-1">Don't have an account </p>
          <NavLink className="text-blue-600" to="/register">
            Register
          </NavLink>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default Login;
