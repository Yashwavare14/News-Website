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

  let url = `${baseUrl}/${endpoint}?${query}&apiKey=133d0dae2eff44ebbae09c188a231fca`;

  const fetchNews = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data.articles);
    console.log(data.articles);
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
