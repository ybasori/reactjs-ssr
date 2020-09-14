import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  putBlogUpdate,
  getBlogShow,
  resetPutBlogUpdate,
} from "../../../_redux/blog";
import { Reducers } from "../../../_redux/types";

const Edit = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const blogState = useSelector((state: Reducers) => state.blog);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", content: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const [oneTimeEffect, setOneTimeEffect] = useState(true);
  const [oneTimeEffectForm, setOneTimeEffectForm] = useState(true);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      dispatch(putBlogUpdate(form, id));
    }
  };

  useEffect(() => {
    if (oneTimeEffect) {
      setOneTimeEffect(false);
      dispatch(getBlogShow(id));
    }
    if (isSubmitting && !blogState.isLoadingPutBlogUpdate) {
      if (blogState.successPutBlogUpdate !== null) {
        setIsSubmitting(false);
        dispatch(resetPutBlogUpdate());
        history.push(`/blog/${id}`);
      }
      if (blogState.errorPutBlogUpdate !== null) {
        setIsSubmitting(false);
        alert(blogState.errorPutBlogUpdate.msg);
        dispatch(resetPutBlogUpdate());
      }
    }
    if (
      !blogState.isLoadingGetBlogShow &&
      blogState.successGetBlogShow !== null &&
      oneTimeEffectForm
    ) {
      setOneTimeEffectForm(false);
      document.title = `Edit ${document.title}`;
      setForm({
        ...form,
        title: blogState.successGetBlogShow.title,
        description: blogState.successGetBlogShow.description,
        content: blogState.successGetBlogShow.content,
      });
    }
  }, [
    form,
    history,
    isSubmitting,
    oneTimeEffect,
    oneTimeEffectForm,
    blogState.isLoadingPutBlogUpdate,
    blogState.successPutBlogUpdate,
    blogState.errorPutBlogUpdate,
    blogState.isLoadingGetBlogShow,
    blogState.successGetBlogShow,
  ]);
  return (
    <form className="columns" onSubmit={onSubmit}>
      {blogState.isLoadingGetBlogShow ? (
        <div className="column has-text-centered">
          <i className="fas fa-circle-notch fa-spin"></i>
        </div>
      ) : (
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
                value={form.title}
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
                value={form.description}
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
                value={form.content}
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
      )}
    </form>
  );
};

export default Edit;
