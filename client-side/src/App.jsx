import NewsBoard from "./components/layout/NewsBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "./components/layout/AppLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewsProvider from "./context/Newscontext";
import AuthProvider from "./context/AuthContext";
import { Saved } from "./pages/Saved";

const App = () => {
  const [user, setUser] = useState();

  // Update localStorage whenever user state changes
  useEffect(() => {
    setUser(localStorage.getItem("loggedInUser"));
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout user={user} setUser={setUser} />,
      children: [
        { path: "/", element: <NewsBoard /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/saved", element: <Saved /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <NewsProvider>
        <RouterProvider router={router} />
      </NewsProvider>
    </AuthProvider>
  );
  // const [category, setCategory] = useState("general");

  // const [searchQuery, setSearchQuery] = useState("");

  // const [condition, setCondition] = useState(true);

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  // return (
  //   <>
  //     <Navbar
  //       setCategory={setCategory}
  //       onSearch={handleSearch}
  //       setCondition={setCondition}
  //     />
  //     <NewsBoard
  //       category={category}
  //       searchQuery={searchQuery}
  //       condition={condition}
  //     />

  //   </>
  // );
};

export default App;
