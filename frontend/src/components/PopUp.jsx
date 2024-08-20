import React from "react";

const PopUp = ({
  title = "This is Pop Up",
  data = "",
  type = "",
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
        {type === "url" && <img src={data}></img>}
        {type === "base64" && <img src={"data:image/png;base64," + data}></img>}
        <div className="description">{title}</div>
      </div>
    </div>
  );
};

export default PopUp;
