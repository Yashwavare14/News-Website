import { useState, useRef } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../utils";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Register = () => {
  const [signupInfo, setsignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setsignupInfo({
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    });

    console.log(signupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = signupInfo;
    if (!username || !email || !password) {
      console.log("all feilds are required");
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        signupInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { message, success } = response.data;
      //const success = response.data.success;
      console.log(message);

      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("error while signup", error);
    }
  };

  return (
    <section className="h-[70vh] flex mt-7">
      <form
        className="bg-white p-10 w-10/12 sm:w-1/2 md:w-auto mx-auto h-[26rem] shadow-xl shadow-gray-500"
        onSubmit={handleSignup}
      >
        <p className="mb-2 text-xl md:text-3xl font-semibold text-gray-700">
          Sign Up
        </p>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleChange}
              ref={username}
              type="text"
              name="floating_user_name"
              id="floating_user_name"
              className="block py-2.5 px-0 w-full text-xs md:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_user_name"
              className="peer-focus:font-medium absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            onChange={handleChange}
            ref={email}
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-xs md:text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="block py-2.5 px-0 w-full text-xs md:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-xs md:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <Toaster />
    </section>
  );
};

export default Register;
