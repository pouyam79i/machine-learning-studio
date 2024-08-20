import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MainPanel from "./components/MainPanel";
import PropsPanel from "./components/PropsPanel";
import ToolsPanel from "./components/ToolsPanel";
import { useState } from "react";
import { createContext } from "react";
import PopUp from "./components/PopUp";

/**
 *  app status list.
 *
 *  dev is the default state: development, done, idle.
 *
 *  run is for algorithm execution: compile -> upload -> execute -> display results.
 *
 *  save is for saving diagram.
 *
 *  load is for loading diagram.
 */
const APP_STATUS = ["dev", "run", "save", "load"];

/**
 *  global app parameters in context.
 */
export const Context = createContext();

/**
 * This component is the bare bones of the application.
 * It contains this SPA layout structure.
 *
 * @returns Structured application.
 */
function App() {
  const [selectedItem, setSelectedItem] = useState();
  const [appStatus, setAppStatus] = useState("dev");
  const [popupData, setPopupData] = useState({
    title: "K-NN model on Iris",
    data: "", // could be a url or base64 encoded string
    type: "base64", // set to 'base64' or 'url'.
  });
  const [showPopUp, setShowPopUp] = useState(false);

  const changeSelectedItem = (newItem) => {
    setSelectedItem(newItem);
  };

  const changeAppStatus = (newAppStatus) => {
    if (APP_STATUS.indexOf(newAppStatus) === -1)
      console.log("illegal app status: " + newAppStatus);
    else setAppStatus(newAppStatus);
  };

  const changePopupData = (title = "", data = "", type = "") => {
    setPopupData({
      title: title,
      data: data,
      type: type,
    });
  };

  return (
    <Context.Provider
      value={{
        useItem: { selectedItem, changeSelectedItem },
        useAppStatus: { appStatus, changeAppStatus },
        usePopUp: { showPopUp, setShowPopUp, changePopupData },
      }}
    >
      {/* pop up */}
      <PopUp
        title={popupData.title}
        data={popupData.data}
        type={popupData.type}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
      ></PopUp>
      {/* app */}
      <Grid
        templateAreas={`"nav nav nav" "tools main props"`}
        templateColumns="250px 1fr 250px"
        templateRows="60px 1fr"
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>

        <GridItem area="tools">
          <ToolsPanel />
        </GridItem>

        <GridItem area="main">
          <MainPanel />
        </GridItem>

        <GridItem area="props">
          <PropsPanel />
        </GridItem>
      </Grid>
    </Context.Provider>
  );
}

export default App;
