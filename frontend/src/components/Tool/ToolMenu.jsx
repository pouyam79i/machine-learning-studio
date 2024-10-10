import React from "react";
import ToolItem from "./ToolItem";

/**
 * This component renders list of items.
 *
 * @param {items} items
 * @returns a menu for List of items
 */
const ToolMenu = ({ items = null, url = "/" }) => {
  if (items == null || items.length == 0) {
    return null;
  }
  return (
    <div className="tool-menu">
      {items.map((item) => {
        return (
          <ToolItem
            key={item.id}
            item={item}
            url={url + "/" + item.tag}
          ></ToolItem>
        );
      })}
    </div>
  );
};

export default ToolMenu;
