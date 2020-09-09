import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postSignupRegister,
  resetPostSignupRegister,
} from "../../_redux/signup";

const Signup = () => {
  const dispatch = useDispatch();
  const signupState = useSelector((state) => state.signup);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      dispatch(postSignupRegister(form));
    }
  };
  useEffect(() => {
    document.title = "Signup";
    if (isSubmitting && !signupState.isLoadingPostSignupRegister) {
      if (signupState.successPostSignupRegister) {
        setIsSubmitting(false);
        dispatch(resetPostSignupRegister());
        alert("Success sign up!");
      }
      if (signupState.errorPostSignupRegister) {
        setIsSubmitting(false);
        alert(signupState.errorPostSignupRegister.msg);
        dispatch(resetPostSignupRegister());
      }
    }
  }, [
    isSubmitting,
    signupState.isLoadingPostSignupRegister,
    signupState.successPostSignupRegister,
    signupState.errorPostSignupRegister,
  ]);
  return (
    <div>
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth">
          <form className="columns" onSubmit={onSubmit}>
            <div className="column">
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    name="username"
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
                    Signup
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

export default Signup;
