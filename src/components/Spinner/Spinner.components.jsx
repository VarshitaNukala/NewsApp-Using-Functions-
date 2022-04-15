import React from "react";
import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={spinner} alt="loading" className="my-3" />
    </div>
  );
};

export default Spinner;
