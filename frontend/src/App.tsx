import { Grid, GridItem, Show } from "@chakra-ui/react";

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
    >
      <GridItem area="nav" bgColor={"red"}>
        Nav
      </GridItem>

      <GridItem area="tools" bgColor={"black"}>
        Components
      </GridItem>

      <GridItem area="main" bgColor={"orange"}>
        Main
      </GridItem>
      <Show above="lg">
        <GridItem area="props" bgColor={"blue"}>
          Props
        </GridItem>
      </Show>
    </Grid>
  );
}

export default App;
