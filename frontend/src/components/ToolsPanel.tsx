import "../style/tools-panel.css";
import { Box, Text } from "@chakra-ui/react";
import DropDownMenu from "./DropDownMenu";
import { BlockProps, Tool } from "../modules";

interface Props {
  tools: Tool[] | null;
  onSelectBlock: (props: BlockProps | null) => void;
}

const ToolsPanel = ({ tools, onSelectBlock }: Props) => {
  return (
    <Box className="tools-panel">
      {tools ? (
        tools.map((tool) => {
          return (
            <DropDownMenu
              title={tool.name}
              blocks={tool.blocks}
              onSelectBlock={onSelectBlock}
            />
          );
        })
      ) : (
        <Text>No Tool is Loaded</Text>
      )}
    </Box>
  );
};

export default ToolsPanel;
