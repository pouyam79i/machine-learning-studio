import { Box, Button, Menu, MenuItem } from "@chakra-ui/react";
import "../style/drop-down-menu.css";
import { useState } from "react";
import { Block, BlockProps } from "../modules";

interface Props {
  title: String;
  blocks: Block[] | null;
  onSelectBlock: (props: BlockProps | null) => void;
}

const DropDownMenu = ({ title, blocks, onSelectBlock }: Props) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <div className="drop-down-menu">
      <Button
        className="drop-btn dropdown-toggle"
        onClick={() => {
          setIsOpen(isOpen ? false : true);
        }}
      >
        {title}
      </Button>
      <Box
        className={"expandable-menu " + (isOpen ? "drop-open" : "drop-close")}
      >
        <Menu>
          {blocks?.map((block) => {
            return (
              <MenuItem
                className="menu-item"
                onClick={() => onSelectBlock(block.props)}
              >
                {block.name}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </div>
  );
};

export default DropDownMenu;
