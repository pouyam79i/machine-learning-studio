import React from "react";
import ToolItem from "./ToolItem";

const ToolMenu = ({ items = null }) => {
  if (items == null || items.length == 0) {
    console.log("No items!");
    return null;
  }
  return (
    <div className="tool-menu">
      {items.map((item) => {
        return <ToolItem key={item.id} item={item}></ToolItem>;
      })}
    </div>
  );
};

export default ToolMenu;
