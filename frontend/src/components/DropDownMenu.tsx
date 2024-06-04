import { Box, Button, Menu, MenuItem } from "@chakra-ui/react";
import "../style/drop-down-menu.css";

interface Props {
  title: String;
}

const DropDownMenu = ({ title }: Props) => {
  return (
    <div className="drop-down-menu">
      <Button className="drop-btn dropdown-toggle">{title}</Button>
      <Box className="expandable-menu">
        <Menu>
          <MenuItem className="menu-item">Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default DropDownMenu;
