import { Box, Button, Menu, MenuItem } from "@chakra-ui/react";
import "../style/drop-down-menu.css";
import { useState } from "react";

interface Props {
  title: String;
}

const DropDownMenu = ({ title }: Props) => {
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
          <MenuItem className="menu-item">Item 1</MenuItem>
          <MenuItem className="menu-item">Item 2</MenuItem>
          <MenuItem className="menu-item">Item 3</MenuItem>
          <MenuItem className="menu-item">Item 4</MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default DropDownMenu;
