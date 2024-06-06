import "../style/tools-panel.css";
import { Box, Text } from "@chakra-ui/react";
import DropDownMenu from "./DropDownMenu";
import { Tool } from "../modules";

interface Props {
  tools: Tool[] | null;
}

const ToolsPanel = ({ tools }: Props) => {
  return (
    <Box className="tools-panel">
      {tools ? (
        tools.map((tool) => {
          return <DropDownMenu title={tool.name} blocks={tool.blocks} />;
        })
      ) : (
        <Text>No Tool is Loaded</Text>
      )}
    </Box>
  );
};

export default ToolsPanel;
