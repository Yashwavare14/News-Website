import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { handleSuccess, handleError } from "../utils";

export const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const username = localStorage.getItem("loggedInUser"); // Assume user is logged in and stored in localStorage

  const loadSavedArticles = useCallback(async () => {
    if (username) {
      try {
        const response = await axios.get(
          `https://news-website-server.onrender.com/saved-articles/user/${username}`
        );
        setSavedArticles(response.data);
      } catch (error) {
        console.error("Error loading saved articles", error);
      }
    }
  }, [username]);

  const saveArticle = useCallback(
    async (article) => {
      if (!username) {
      console.log("No user logged in. Cannot save article.");
      toast.error("Login Before Saving", {
        position: "top-center",
        hideProgressBar: false,
        className: "custom-toast",
        autoClose: 3000,
      });
      }
      try {
        const response = await axios.post(
          "https://news-website-server.onrender.com/saved-articles/save",
          {
            username,
            article,
          }
        );
        const { success, message } = response.data;
        setSavedArticles((prevArticles) => [...prevArticles, response.data]);

        if (success) {
          loadSavedArticles();
          handleSuccess(message);
        } else {
          handleError(message);
        }
        console.log("article saved successfully");
      } catch (error) {
        console.log("Error saving article", error);
      }
    },
    [username, loadSavedArticles]
  );

  useEffect(() => {
    loadSavedArticles();
  }, [loadSavedArticles]);

  return (
    <ArticleContext.Provider
      value={{ savedArticles, saveArticle, loadSavedArticles }}
    >
      {children}
      <Toaster />
    </ArticleContext.Provider>
  );
};

export default ArticleProvider;
