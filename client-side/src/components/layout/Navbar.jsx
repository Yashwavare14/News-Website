import { useContext, useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { NewsContext } from "../../context/Newscontext";
import { AuthContext } from "../../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { handleSuccess } from "../../utils";

export default function Navbar() {
  const { setCategory, handleSearch, setCondition } = useContext(NewsContext);
  const { user, updateUser } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    updateUser();
  }, []);

  console.log(user);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCondition(false);
    handleSearch(inputValue); // Pass the search query to App
  };

  // const loginUser = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    updateUser();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <nav className="sticky top-0 z-20">
      <div>
        <div className=" bg-red-500 flex justify-between h-16 md:h-20 items-center">
          <p className="text-white m-5 text-2xl md:text-3xl font-bold">
            NewsPulse
          </p>

          <div className="text-[0.93rem] mr-5 md:mr-20 items-center flex sm:text-base md:text-base">
            <form
              className="search mr-5 items-center hidden sm:flex md:flex"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                placeholder="Search any keyword "
                value={inputValue}
                onChange={handleInputChange}
                className="m-5 mr-0 p-3 h-8 md:w-72 sm:w-48 text-white placeholder-white bg-red-500 border-slate-50 border-[1px] rounded focus:outline-none"
              />
            </form>

            {/* <NavLink
              to="/"
              className="text-white m-2 hidden sm:block md:block "
            >
              Home
            </NavLink> */}

            <NavLink
              to="/saved"
              className={`text-white m-2 md:m-5 ${user ? "block" : "hidden"}`}
            >
              Saved
            </NavLink>
            <NavLink
              to="/login"
              className="flex gap-1 items-center text-white m-2 md:m-2"
            >
              <IoMdPerson /> {user || "Sign In"}
            </NavLink>
            {/* <NavLink to="/register" className="text-white m-3">
              Register
            </NavLink> */}

            <div>
              <button
                onClick={handleLogout}
                className={`m-2 md:ml-5 text-white ${
                  user ? "block" : "hidden"
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-white ">
        <ul
          className=" p-3 flex gap-x-1 md:gap-x-4 overflow-auto"
          id="category-nav"
        >
          <li>
            <div
              className=" md:ml-5 px-1 font-semibold text-red-500 text-sm hover:cursor-pointer hover:bg-red-50 md:text-base md:p-2"
              onClick={() => {
                setCategory("general");
                setCondition(true);
              }}
            >
              General
            </div>
          </li>
          <li>
            <div
              className="px-1 text-gray-600 font-semibold text-sm  hover:cursor-pointer hover:bg-red-50 md:text-base md:p-2"
              onClick={() => {
                setCategory("business");
                setCondition(true);
              }}
            >
              Business
            </div>
          </li>
          <li>
            <div
              className="px-1  text-gray-600 font-semibold text-sm hover:cursor-pointer hover:bg-red-50 md:text-base md:p-2"
              onClick={() => {
                setCategory("entertainment");
                setCondition(true);
              }}
            >
              Entertainment
            </div>
          </li>
          <li>
            <div
              className=" px-1  text-gray-600 font-semibold text-sm hover:cursor-pointer hover:bg-red-50 md:text-base md:p-2"
              onClick={() => {
                setCategory("health");
                setCondition(true);
              }}
            >
              Health
            </div>
          </li>
          <li>
            <div
              className="px-1  text-gray-600 font-semibold text-sm hover:cursor-pointer hover:bg-red-50 md:text-base md:p-2"
              onClick={() => {
                setCategory("science");
                setCondition(true);
              }}
            >
              Science
            </div>
          </li>
          <li>
            <div
              className="px-1  text-gray-600 font-semibold text-sm hover:cursor-pointer hover:bg-red-50 md:text-base md:p-2"
              onClick={() => {
                setCategory("sports");
                setCondition(true);
              }}
            >
              Sports
            </div>
          </li>
          <li>
            <div
              className="px-1  text-gray-600 font-semibold text-sm hover:cursor-pointer hover:bg-red-50 md:text-base md:p-2"
              onClick={() => {
                setCategory("technology");
                setCondition(true);
              }}
            >
              Technology
            </div>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSearchSubmit} className="m-1">
        <input
          type="text"
          placeholder="Search any keyword"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:border-red-300 focus:outline-none sm:hidden md:hidden"
        />
      </form>
      <Toaster />
    </nav>
  );
}
