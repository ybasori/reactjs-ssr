import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  postAuthAuthenticate,
  resetPostAuthAuthenticate,
} from "../../_redux/auth";
import { Reducers } from "../../_redux/types";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useSelector((state: Reducers) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      dispatch(postAuthAuthenticate(form));
    }
  };
  useEffect(() => {
    document.title = "Login";
    if (isSubmitting && !authState.isLoadingPostAuthAuthenticate) {
      if (authState.auth !== null) {
        setIsSubmitting(false);
        history.push("/");
      }
      if (authState.errorPostAuthAuthenticate !== null) {
        setIsSubmitting(false);
        dispatch(resetPostAuthAuthenticate());
      }
    }
  }, [
    isSubmitting,
    history,
    authState.isLoadingPostAuthAuthenticate,
    authState.auth,
    authState.errorPostAuthAuthenticate,
  ]);
  return (
    <div>
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth">
          <form className="columns" onSubmit={onSubmit}>
            <div className="column">
              <div className="field">
                <label className="label">Username/email</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username/email"
                    name="email"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-link"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
