import { Box, Button, Menu, MenuItem } from "@chakra-ui/react";
import "../style/drop-down-menu.css";
import { useState } from "react";
import { Block } from "../modules";

interface Props {
  title: String;
  blocks: Block[] | null;
}

const DropDownMenu = ({ title, blocks }: Props) => {
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
            return <MenuItem className="menu-item">{block.name}</MenuItem>;
          })}
        </Menu>
      </Box>
    </div>
  );
};

export default DropDownMenu;
