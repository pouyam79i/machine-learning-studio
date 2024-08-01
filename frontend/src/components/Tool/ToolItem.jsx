import React, { useState } from "react";
import ToolMenu from "./ToolMenu";
import { useContext } from "react";
import { Context } from "../../App";

/**
 * data of a tool item
 * @param {item} item
 * @returns Menu for that level of items
 */
const ToolItem = ({ item = null }) => {
  // expand value tells if there is a menu you can show it or not
  // it also shows active select for current item
  const [expandMenu, setExpandMenu] = useState(false);
  const {
    useItem: { changeSelectedItem },
  } = useContext(Context);

  if (item == null) {
    console.log("null item");
    return null;
  }
  return (
    <div className="tool-item">
      <button
        onClick={() => {
          let newExpandValue = !expandMenu;
          setExpandMenu(newExpandValue);
          if (newExpandValue) {
            changeSelectedItem(item);
          }
        }}
      >
        {item.title}
      </button>
      {item.items && expandMenu && <ToolMenu items={item.items}></ToolMenu>}
    </div>
  );
};

export default ToolItem;
