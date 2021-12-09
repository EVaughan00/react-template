import { IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  onToggle: () => void;
}

const HamburgerToggle: FunctionComponent<Props> = (props) => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={props.onToggle}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default HamburgerToggle;
