import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ToolsPanel from "./components/ToolsPanel";
import "./App.css";
import modules from "./modules";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav nav" "tools main"`,
        lg: `"nav nav nav" "tools main props"`,
      }}
      templateColumns={{
        base: "200px 1fr",
        lg: "250px 1fr 250px",
      }}
      templateRows={{ base: "50px 1fr", lg: "50px 1fr" }}
      className="grid-style"
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem area="tools" bgColor={"black"}>
        <ToolsPanel tools={modules.tools} />
      </GridItem>

      <GridItem area="main" bgColor={"orange"}>
        Main
      </GridItem>
      <Show above="lg">
        <GridItem area="props" bgColor={"red"}>
          Props
        </GridItem>
      </Show>
    </Grid>
  );
}

export default App;
