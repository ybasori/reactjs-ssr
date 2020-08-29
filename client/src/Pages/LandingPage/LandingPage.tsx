import React, { useEffect, FunctionComponent } from "react";

const LandingPage: FunctionComponent = () => {
  useEffect(() => {
    document.title = "Home";
  });
  return <div>Landing Page zzz</div>;
};

export default LandingPage;
