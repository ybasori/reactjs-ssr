import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import moment from "../../../_utils/moment";
import { getBlogIndex } from "../../../_redux/blog";

const Main = () => {
  const dispatch = useDispatch();
  const { blog: blogState } = useSelector((state) => state);

  const [oneTimeEffect, setOneTimeEffect] = useState(true);

  useEffect(() => {
    if (oneTimeEffect) {
      document.title = "Blog";
      setOneTimeEffect(false);
      dispatch(getBlogIndex());
    }
  }, [oneTimeEffect]);

  return (
    <div className="blog-data">
      {blogState.isLoadingGetBlogIndex && <>Loading...</>}
      {blogState.successGetBlogIndex && (
        <>
          {blogState.successGetBlogIndex.data &&
            blogState.successGetBlogIndex.data.map((item, key) => (
              <div key={key}>
                <div className="columns">
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <Link className="blog-link" to={`/blog/${item.id}`}>
                          <h1 className="is-size-3 blog-title">{item.title}</h1>
                        </Link>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column blog-date">
                        {moment.utc(item.publishedAt).local().format("LLLL")}
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className="column blog-content"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      ></div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Main;
