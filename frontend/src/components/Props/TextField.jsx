import React from "react";

const TextField = ({ prop: { title, tag } }) => {
  return (
    <div className="prop-text-field">
      <label>{title}</label>
      <input placeholder={tag + "..."}></input>
    </div>
  );
};

export default TextField;
