import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MainPanel from "./components/MainPanel";
import PropsPanel from "./components/PropsPanel";
import ToolsPanel from "./components/ToolsPanel";

/**
 * This component is the bare bones of the application.
 * It contains this SPA layout structure.
 *
 * @returns Structured application.
 */
function App() {
  return (
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
  );
}

export default App;
