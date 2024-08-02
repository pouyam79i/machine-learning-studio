import React from "react";
import ToolMenu from "./Tool/ToolMenu";
import Modules from "../modules";

/**
 * This component contains the tool panel structure.
 * It initially read menu items and use ToolMenu to build top level menu items.
 *
 * @returns ToolPanel structure
 */
const ToolsPanel = () => {
  return (
    <div className="tools-panel">
      <ToolMenu items={Modules.items} url="/tools"></ToolMenu>
    </div>
  );
};

export default ToolsPanel;
