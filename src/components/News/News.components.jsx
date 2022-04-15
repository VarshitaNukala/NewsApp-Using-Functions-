import React, { useState, useEffect } from "react";

import NewsItem from "../NewsItem/NewsItem.components.jsx";
import Spinner from "../Spinner/Spinner.components.jsx";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = ({ country, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async (props) => {
    let newURL = `https://newsdata.io/api/1/news?apikey=pub_6502202e8011ffea83f985095e887ac89214&language=en&country=${country}&category=${category}&page=${page}`;
    setLoading(true);
    let data = await fetch(newURL);
    let parsedData = await data.json();

    setArticles(parsedData.results);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  };

  useEffect(() => {
    updateNews();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = async () => {
    let newURL = `https://newsdata.io/api/1/news?apikey=pub_6502202e8011ffea83f985095e887ac89214&language=en&country=${country}&category=${category}&page=${
      page + 1
    }`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(newURL);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.results));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div>
      <div className="container my-3 ">
        <h1 className="text-center" style={{ marginTop: "80px" }}>
          NewsMonkey -{capitalizeFirstLetter(category)} Top Headlines
        </h1>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.link}>
                  <NewsItem
                    title={capitalizeFirstLetter(element.title)}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageURL={
                      element.image_url
                        ? element.image_url
                        : "https://www.gamespot.com/a/uploads/screen_medium/1179/11799911/3964587-screenshot2022-04-14at11.03.44am.jpg"
                    }
                    newsURL={element.link}
                    date={element.pubDate}
                    author={element.creator}
                    source={element.source_id}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "in",

  category: "general",
};

News.propTypes = {
  country: PropTypes.string,

  category: PropTypes.string,
};

export default News;
