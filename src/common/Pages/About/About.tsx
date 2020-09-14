import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About";
  });
  return (
    <div>
      <div className="columns">
        <div className="column">About</div>
      </div>
    </div>
  );
};

export default About;
