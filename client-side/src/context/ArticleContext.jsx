import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/ReactToastify.css";
// import { handleSuccess, handleError } from "../utils";

export const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const username = localStorage.getItem("loggedInUser"); // Assume user is logged in and stored in localStorage

  const loadSavedArticles = useCallback(async () => {
    if (username) {
      try {
        const response = await axios.get(
          `http://localhost:5000/saved-articles/user/${username}`
        );
        setSavedArticles(response.data);
      } catch (error) {
        console.error("Error loading saved articles", error);
      }
    }
  }, [username]);

  const saveArticle = useCallback(
    async (article) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/saved-articles/save",
          {
            username,
            article,
          }
        );
        const { success, message } = response.data;
        setSavedArticles((prevArticles) => [...prevArticles, response.data]);
        // if (success) {
        //   handleSuccess(message);
        // }
        console.log("article saved successfully");
      } catch (error) {
        console.log("Error saving article", error);
      }
    },
    [username]
  );

  useEffect(() => {
    loadSavedArticles();
  }, [loadSavedArticles]);

  return (
    <ArticleContext.Provider
      value={{ savedArticles, saveArticle, loadSavedArticles }}
    >
      {children}
      {/*<ToastContainer autoClose={3000} />*/}
    </ArticleContext.Provider>
  );
};

export default ArticleProvider;
