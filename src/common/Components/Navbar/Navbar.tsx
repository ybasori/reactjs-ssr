import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Reducers } from "../../_redux/types";
import { resetPostAuthAuthenticate } from "../../_redux/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: Reducers) => state.auth);
  const [isActive, setIsActvie] = useState(false);
  const onLogout = () => {
    dispatch(resetPostAuthAuthenticate());
  };
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/assets/logo.png" alt="" />
        </Link>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setIsActvie(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive && "is-active"}`}
      >
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>
          <NavLink className="navbar-item" to="/blog">
            Blog
          </NavLink>
          <NavLink className="navbar-item" to="/about">
            About
          </NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!authState.auth ? (
                <>
                  <Link className="button is-primary" to="/signup">
                    <strong>Sign up</strong>
                  </Link>
                  <Link className="button is-light" to="/login">
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  <button className="button is-light" onClick={onLogout}>
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
