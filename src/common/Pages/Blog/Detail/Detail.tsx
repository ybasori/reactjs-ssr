import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import moment from "../../../_utils/moment";
import {
  deleteBlogDelete,
  getBlogShow,
  resetDeleteBlogDelete,
} from "../../../_redux/blog";
import { Reducers } from "../../../_redux/types";

const Detail = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const { blog: blogState, auth: authState } = useSelector(
    (state: Reducers) => state
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const [oneTimeEffect, setOneTimeEffect] = useState(true);

  const onDelete = () => {
    if (confirm("Are sure?")) {
      setIsDeleting(true);
      dispatch(deleteBlogDelete(id));
    }
  };

  useEffect(() => {
    if (oneTimeEffect) {
      setOneTimeEffect(false);
      dispatch(getBlogShow(id));
    }
    if (isDeleting && !blogState.isLoadingDeleteBlogDelete) {
      if (blogState.successDeleteBlogDelete !== null) {
        history.push("/blog");
        setIsDeleting(false);
        dispatch(resetDeleteBlogDelete());
      }
      if (blogState.errorDeleteBlogDelete !== null) {
        setIsDeleting(false);
        dispatch(resetDeleteBlogDelete());
      }
    }
  }, [
    oneTimeEffect,
    isDeleting,
    blogState.isLoadingDeleteBlogDelete,
    blogState.successDeleteBlogDelete,
    blogState.errorDeleteBlogDelete,
  ]);

  return (
    <div className="columns">
      {blogState.isLoadingGetBlogShow && (
        <div className="column has-text-centered">
          <i className="fas fa-circle-notch fa-spin"></i>
        </div>
      )}
      <div
        className="column"
        style={{ display: blogState.successGetBlogShow ? "block" : "none" }}
      >
        <div className="columns">
          <div className="column">
            <Link to={`/blog/${id}`}>
              <h1 className="is-size-3" id="blog-title">
                {blogState.successGetBlogShow &&
                  blogState.successGetBlogShow.title}
              </h1>
            </Link>
          </div>
        </div>
        <div className="columns">
          <div className="column" id="blog-date">
            {blogState.successGetBlogShow &&
              moment
                .utc(blogState.successGetBlogShow.publishedAt)
                .local()
                .format("LLLL")}
          </div>
        </div>
        <div className="columns">
          <div
            className="column"
            id="blog-content"
            dangerouslySetInnerHTML={{
              __html:
                blogState.successGetBlogShow &&
                blogState.successGetBlogShow.content,
            }}
          ></div>
        </div>
        <div className="columns">
          <div className="column">
            {authState.auth && (
              <div className="buttons">
                <Link className="button is-light" to={`/blog/${id}/edit`}>
                  Edit
                </Link>
                <button
                  className="button is-danger is-light"
                  onClick={onDelete}
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
