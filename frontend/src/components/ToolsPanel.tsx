import "../style/tools-panel.css";
import { Box } from "@chakra-ui/react";
import DropDownMenu from "./DropDownMenu";

const ToolsPanel = () => {
  return (
    <Box className="tools-panel">
      <DropDownMenu title={"Import Dataset"} />
      <DropDownMenu title={"ML Algorithms"} />
      <DropDownMenu title={"Charts"} />
    </Box>
  );
};

export default ToolsPanel;
