import { useContext, useEffect } from "react";
import { ArticleContext } from "../context/ArticleContext";
import SavedArticleCard from "../components/layout/SavedArticle";

export const Saved = () => {
  const { savedArticles, loadSavedArticles } = useContext(ArticleContext);

  useEffect(() => {
    loadSavedArticles;
  }, []);
  console.log(savedArticles);

  return (
    <section>
      <div className="m-8 ">
        <h1 className="text-4xl font-bold">Your Saved News</h1>
      </div>
      <div className="flex flex-wrap justify-center ">
        {savedArticles.map((article, index) => {
          return (
            <SavedArticleCard
              key={index}
              title={article.title}
              description={article.description}
              srcImg={article.urlToImage}
              url={article.url}
            />
          );
        })}
      </div>
    </section>
  );
};
