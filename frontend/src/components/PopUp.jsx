import React, { useContext } from "react";
import { AppContext } from "../AppContext";

const PopUp = () => {
  const {
    usePopUp: { popupData, showPopUp, setShowPopUp },
  } = useContext(AppContext);

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
        {popupData.type === "url" && <img src={popupData.data}></img>}
        {popupData.type === "base64" && (
          <img src={"data:image/png;base64," + popupData.data}></img>
        )}
        <div className="description">{popupData.title}</div>
      </div>
    </div>
  );
};

export default PopUp;
