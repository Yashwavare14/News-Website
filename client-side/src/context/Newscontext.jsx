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

  const endpoint = condition ? "top-headlines" : "everything";

  const query = condition
    ? `category=${category}`
    : `q=${encodeURIComponent(searchQuery)}`;

  //let url = `${baseUrl}/${endpoint}?${query}`;

  const fetchNews = async () => {
  const proxyUrl = import.meta.env.news_api; // Replace with your Render proxy URL
  const query = condition
    ? `category=${category}`
    : `searchQuery=${encodeURIComponent(searchQuery)}`;

  try {
    const response = await fetch(`${proxyUrl}?${query}`);
    if (!response.ok) {
      console.error("Error fetching news:", response.status);
      return;
    }

    const data = await response.json();
    setArticles(data.articles);
    
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
