import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  });
  return (
    <div>
      <div className="columns">
        <div className="column">Home</div>
      </div>
    </div>
  );
};

export default Home;
