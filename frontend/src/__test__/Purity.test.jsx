import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ReactFlowProvider } from "@xyflow/react";

import { AppContextProvider } from "../AppContext";
import { DiagramContext } from "../engine/DiagramEngine";

// app
import App from "../App";
// main components
import NavBar from "../components/NavBar";
import PopUp from "../components/PopUp";
import MainPanel from "../components/MainPanel";
// props
import PropsPanel from "../components/PropsPanel";
import TextField from "../components/Props/TextField";
import Description from "../components/Props/Description";
// tools
import ToolsPanel from "../components/ToolsPanel";
import ToolItem from "../components/Tool/ToolItem";
import ToolMenu from "../components/Tool/ToolMenu";
// diagram related
import DiagramEngine from "../engine/DiagramEngine";
import SimpleNode from "../engine/nodes/SimpleNode";
import React from "react";
import { nodeFactory } from "../engine/nodes/createNode";

describe("Rendering components for purity", () => {
  // App component
  it("App", () => {
    global.ResizeObserver = require("resize-observer-polyfill");
    render(
      <AppContextProvider>
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  // main components
  it("NavBar", () => {
    render(
      <AppContextProvider>
        <NavBar />
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  it("PopUp", () => {
    render(
      <AppContextProvider>
        <PopUp />
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  it("MainPanel", () => {
    global.ResizeObserver = require("resize-observer-polyfill");
    render(
      <AppContextProvider>
        <ReactFlowProvider>
          <MainPanel />
        </ReactFlowProvider>
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });

  // props
  it("PropsPanel", () => {
    render(
      <AppContextProvider>
        <PropsPanel />
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  it("props/TextField", () => {
    render(
      <AppContextProvider>
        <TextField prop={{ title: "some title" }} />
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  it("props/Description", () => {
    render(<Description prop={{ title: "some title", href: "some ref" }} />);
    expect(true).toBeTruthy();
  });

  // tools
  it("ToolsPanel", () => {
    render(
      <AppContextProvider>
        <ToolsPanel />
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  it("tools/ToolItem", () => {
    render(
      <AppContextProvider>
        <ToolItem />
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  it("tools/ToolMenu", () => {
    render(<ToolMenu />);
    expect(true).toBeTruthy();
  });

  // diagram related
  it("engine/DiagramEngine", () => {
    global.ResizeObserver = require("resize-observer-polyfill");
    render(
      <AppContextProvider>
        <ReactFlowProvider>
          <DiagramEngine />
        </ReactFlowProvider>
      </AppContextProvider>
    );
    expect(true).toBeTruthy();
  });
  it("engine/nodes/SimpleNode", () => {
    global.ResizeObserver = require("resize-observer-polyfill");
    render(
      <ReactFlowProvider>
        <AppContextProvider>
          <DiagramContext.Provider
            value={{
              nodeRelated: [null, null],
              edgeRelated: [null, null],
            }}
          >
            <SimpleNode data={nodeFactory()} />
          </DiagramContext.Provider>
        </AppContextProvider>
      </ReactFlowProvider>
    );
    expect(true).toBeTruthy();
  });
});
