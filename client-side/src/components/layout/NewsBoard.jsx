import { useContext } from "react";
import NewsCard from "./NewsCard";
import { NewsContext } from "../../context/Newscontext";

export default function NewsBoard() {
  const { articles, loading } = useContext(NewsContext);

  return (
    <div className="flex flex-col bg-gray-100 pt-1 md:pt-6">
      <div className="flex flex-wrap justify-center ">
        { ( loading ? ( // Conditional rendering
        <div className="flex justify-center items-center text-xl font-semibold">
          Loading...
        </div>
      ) :  articles?.map((news, index) => {
          return (
            <NewsCard
              key={index}
              title={news.title}
              description={news.description}
              srcImg={news.urlToImage}
              url={news.url}
            />
          );
        }) )}
      </div>
    </div>
  );
}
