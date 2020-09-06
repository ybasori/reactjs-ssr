import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postBlogStore, resetPostBlogStore } from "../../../_redux/blog";

const Create = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", content: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      dispatch(postBlogStore(form));
    }
  };
  useEffect(() => {
    if (isSubmitting && !blogState.isLoadingPostBlogStore) {
      if (blogState.successPostBlogStore !== null) {
        setIsSubmitting(false);
        dispatch(resetPostBlogStore());
        history.push("/blog");
      }
      if (blogState.errorPostBlogStore !== null) {
        setIsSubmitting(false);
        alert(blogState.errorPostBlogStore.msg);
        dispatch(resetPostBlogStore());
      }
    }
  }, [
    history,
    isSubmitting,
    blogState.isLoadingPostBlogStore,
    blogState.successPostBlogStore,
    blogState.errorPostBlogStore,
  ]);
  return (
    <form className="columns" onSubmit={onSubmit}>
      <div className="column">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Title"
              name="title"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Description"
              name="description"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Content"
              name="content"
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Create;
