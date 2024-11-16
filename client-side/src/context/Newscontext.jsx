import { createContext, useEffect, useState } from "react";

// create context
export const NewsContext = createContext();

//Provider component
const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  const [category, setCategory] = useState("general");

  const [searchQuery, setSearchQuery] = useState("");

  const [condition, setCondition] = useState(true);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const baseUrl = "https://newsapi.org/v2";

  const endpoint = condition ? "top-headlines" : "everything";

  const query = condition
    ? `category=${category}`
    : `q=${encodeURIComponent(searchQuery)}`;

  let url = `https://cors-anywhere.herokuapp.com/${baseUrl}/${endpoint}?${query}`;

   const fetchNews = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Add your API key here
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", response.status, errorData.message);
        return;
      }
      const data = await response.json();
      setArticles(data.articles);
      console.log(data.articles);
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, condition, searchQuery]);

  return (
    <NewsContext.Provider
      value={{ articles, setCategory, handleSearch, setCondition }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
