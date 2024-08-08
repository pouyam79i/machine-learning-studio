import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MainPanel from "./components/MainPanel";
import PropsPanel from "./components/PropsPanel";
import ToolsPanel from "./components/ToolsPanel";
import { useState } from "react";
import { createContext } from "react";

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
  const changeSelectedItem = (newItem) => {
    setSelectedItem(newItem);
  };

  return (
    <Context.Provider value={{ useItem: { selectedItem, changeSelectedItem } }}>
      <Grid
        templateAreas={`"nav nav nav" "tools main props"`}
        templateColumns="250px 1fr 250px"
        templateRows="50px 1fr"
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
