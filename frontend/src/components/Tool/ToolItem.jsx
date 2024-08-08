import React, { useEffect, useState } from "react";
import ToolMenu from "./ToolMenu";
import { useContext } from "react";
import { Context } from "../../App";
import { getNodePostByUrl } from "../../engine/nodes/createNode";

/**
 * data of a tool item
 * @param {item} item
 * @returns Menu for that level of items
 */
const ToolItem = ({ item = null, url = "/" }) => {
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

  /**
   * custom drag start
   * @param {html event} event
   */
  const onDragStart = (event) => {
    if (item.items) return; // not a tool!

    let args = {
      type: "SimpleNode",
      data: { title: item.title, tag: item.tag, post: getNodePostByUrl(url) },
    };
    args = JSON.stringify(args);
    event.dataTransfer.setData("application/reactflow", args);
    event.dataTransfer.effectAllowed = "move";
  };

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
          if (newExpandValue && item.props) {
            changeSelectedItem(item);
          }
        }}
        onDragStart={onDragStart}
        draggable={item.items === null || item.items.length === 0}
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
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {item.items && expandMenu && (
        <ToolMenu items={item.items} url={url}></ToolMenu>
      )}
    </div>
  );
};

export default ToolItem;
