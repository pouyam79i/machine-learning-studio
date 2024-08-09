import React, { useState } from "react";
import irisResult from "../../public/iris_test.png";

const PopUp = ({
  title = "This is Pop Up",
  url = "",
  showPopUp = false,
  setShowPopUp,
}) => {
  return (
    <div
      id="pop-up-cover"
      className="pop-up"
      onClick={(event) => {
        if (event.target.id == "pop-up-cover") setShowPopUp(false);
      }}
      style={{ display: showPopUp ? "flex" : "none" }}
    >
      <div className="container">
        <img src={irisResult}></img>
        <div className="description">{title}</div>
      </div>
    </div>
  );
};

export default PopUp;
