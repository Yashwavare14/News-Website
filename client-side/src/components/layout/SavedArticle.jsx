const SavedArticleCard = ({ title, description, srcImg, url }) => {
  return (
    <section>
      <div className="inline-block m-3 w-72 md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg ">
        <a href="#">
          <img className="rounded-t-lg w-72 md:w-80" src={srcImg} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h5>
          </a>
          <p className="mb-3 text-sm  md:font-normal text-gray-700">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={url}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Read More
            </a>
            <button
              type="button"
              className="flex gap-1 items-center focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-3 py-2  dark:bg-red-600 dark:hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavedArticleCard;
