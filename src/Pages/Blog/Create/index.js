import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Create = ({ setPathname }) => {
  const history = useHistory();

  const [oneTimeEffect, setOneTimeEffect] = useState(true);

  const { pathname } = history.location;

  useEffect(() => {
    if (oneTimeEffect) {
      setOneTimeEffect(false);
      setPathname(pathname);
    }
  }, [oneTimeEffect, setPathname, pathname]);

  return (
    <div className="columns">
      <div className="column">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" placeholder="Title" />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input className="input" type="text" placeholder="Description" />
          </div>
        </div>

        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea className="textarea" placeholder="Content"></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
