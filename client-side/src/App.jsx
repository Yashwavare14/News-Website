import NewsBoard from "./components/layout/NewsBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "./components/layout/AppLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewsProvider from "./context/Newscontext";
import AuthProvider from "./context/AuthContext";
import { Saved } from "./pages/Saved";
import ArticleProvider, { ArticleContext } from "./context/ArticleContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <NewsBoard /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/saved", element: <Saved /> },
      ],
    },
  ]);

  return (
    <ArticleProvider>
      <AuthProvider>
        <NewsProvider>
          <RouterProvider router={router} />
        </NewsProvider>
      </AuthProvider>
    </ArticleProvider>
  );
};

export default App;
