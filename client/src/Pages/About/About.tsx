import React, { useEffect, FunctionComponent } from "react";

const About: FunctionComponent = () => {
  useEffect(() => {
    document.title = "About";
  }, []);
  return <div>about</div>;
};

export default About;
