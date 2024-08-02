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
        style={{
          background:
            expandMenu && item.items ? "var(--selected-background)" : "",
        }}
        className="btn btn-dark"
        onClick={() => {
          let newExpandValue = !expandMenu;
          setExpandMenu(newExpandValue);
          if (newExpandValue) {
            changeSelectedItem(item);
          }
        }}
      >
        <>{item.title}</>
        {item.items && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              rotate: expandMenu ? "270deg" : "180deg",
              transition: "rotate 200ms ease-in-out",
            }}
          >
            <path
              opacity="0.4"
              d="M8.90666 5.64667L6.56 8L8.90666 10.3533"
              stroke="var(--text-color)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </button>
      {item.items && expandMenu && <ToolMenu items={item.items}></ToolMenu>}
    </div>
  );
};

export default ToolItem;
