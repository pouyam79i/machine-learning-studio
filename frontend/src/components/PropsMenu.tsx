import { Box, Input } from "@chakra-ui/react";
import "../style/props-menu.css";
import { BlockProps } from "../modules";

interface Props {
  props: BlockProps | null;
}

const PropsMenu = ({ props }: Props) => {
  if (props == null) {
    return <Box className="props-menu">No Item Selected!</Box>;
  }

  return (
    <Box className="props-menu">
      {props.fields.map((field) => {
        return (
          <Input
            className="field"
            id={field.id}
            placeholder={field.title}
          ></Input>
        );
      })}
    </Box>
  );
};

export default PropsMenu;
