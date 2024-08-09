import React, { useEffect, useState } from "react";
import { getDescriptions } from "../../modules";

const Description = ({ prop: { title = "", href = "" } }) => {
  // TODO: replace with and api for title description
  // const [description, setDescription] = useState("");
  // load link data
  // useEffect(() => {}, [href]);

  return (
    <div className="props-description">
      <div className="head">{title}</div>
      <div className="description">{getDescriptions(href)}</div>
    </div>
  );
};

export default Description;
