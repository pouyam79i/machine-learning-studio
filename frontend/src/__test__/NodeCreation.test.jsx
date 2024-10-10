import { describe, it, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { ReactFlowProvider } from "@xyflow/react";

import ToolItem from "../components/Tool/ToolItem";
import { AppContextProvider } from "../AppContext";
import DiagramEngine from "../engine/DiagramEngine";

describe("Testing node creation process.", () => {
  it("node creation", async () => {
    function createDataTransfer() {
      var data = {};
      return {
        setData: (key, value) => {
          data[key] = value;
        },
        getData: (key) => {
          return data[key];
        },
        dropEffect: "",
      };
    }

    const sampleItemData = {
      id: 0,
      title: "Test-Btn",
      tag: "test",
      props: [],
      items: null,
    };

    global.ResizeObserver = require("resize-observer-polyfill");
    render(
      <>
        <AppContextProvider>
          <ToolItem item={sampleItemData} url={"/"} />
          <ReactFlowProvider>
            <DiagramEngine />
          </ReactFlowProvider>
        </AppContextProvider>
      </>
    );

    const dataTransfer = createDataTransfer();

    const draggableButton = screen.getByText("Test-Btn");
    fireEvent.dragStart(draggableButton, { dataTransfer });

    const dropArea = screen.getByTestId("rf__wrapper");

    fireEvent.dragOver(dropArea, { dataTransfer });
    fireEvent.drop(dropArea, { dataTransfer });

    // here is created node id
    const node_id = JSON.parse(dataTransfer.getData("application/test")).id;
    expect(
      JSON.parse(dataTransfer.getData("application/test")).id
    ).toBeTruthy();

    // Check that the node appears in ReactFlow
    expect(screen.getByTestId("rf__node-" + node_id)).toBeTruthy();
  });
});
