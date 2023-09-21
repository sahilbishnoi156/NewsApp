import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFunc = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async () => {
    props.setProgress(10);
    document.title = `${capitalizeFunc(props.category)} - NewsMonkey`;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(40);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line 
  },[totalResults]);

  const fetchMoreData = async () => {
    document.title = `${capitalizeFunc(props.category)} - NewsMonkey`;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles([...articles, ...parsedData.articles]);
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div
      className="container p-3 m-4"
      style={{
        overflow: loading ? "hidden" : "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <h2 className="text-center mb-3 text-light">
        Top {capitalizeFunc(props.category)} Headlines - {totalResults}
      </h2>
      <div className="container text-center">{loading && <Loading />}</div>
      <div
        className="d-flex justify-content-center"
        style={{
          overflow: loading ? "hidden" : "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Loading />}
          style={{
            overflow: "hidden",
          }}
          scrollableTarget="scrollableDiv"
          loading={loading}
        >
          <div
            className={`container d-grid overflow-hidden`}
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))",
              gridRowGap: "3rem",
              gridColumnGap: "6rem",
              overflow: loading ? "hidden" : "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {articles.map((ele) => {
              return (
                <div className="col-md-4" key={ele.url}>
                  <NewsItem
                    title={ele.source.name}
                    description={ele.title.slice(0, 88) + "..."}
                    imgUrl={
                      ele.urlToImage === null
                        ? "https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg"
                        : ele.urlToImage
                    }
                    url={ele.url}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

News.defaultProps = {
  pageSize: 6,
  country: "in",
  category: "general",
  totalResults: 0,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
