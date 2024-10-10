import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MainPanel from "./components/MainPanel";
import PropsPanel from "./components/PropsPanel";
import ToolsPanel from "./components/ToolsPanel";
import { AppContextProvider } from "./AppContext";
import PopUp from "./components/PopUp";

/**
 * This component is the bare bones of the application.
 * It contains this SPA layout structure.
 *
 * @returns Structured application.
 */
function App() {
  return (
    <AppContextProvider>
      {/* pop up */}
      <PopUp
      // title={popupData.title}
      // data={popupData.data}
      // type={popupData.type}
      // showPopUp={showPopUp}
      // setShowPopUp={setShowPopUp}
      ></PopUp>
      {/* app */}
      <Grid
        style={{ height: "100%" }}
        templateAreas={`"nav nav nav" "tools main props"`}
        templateColumns="250px 1fr 250px"
        templateRows="80px 1fr"
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
    </AppContextProvider>
  );
}

export default App;
