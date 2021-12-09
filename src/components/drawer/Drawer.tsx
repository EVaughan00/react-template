import {
  Box,
  Divider,
  Drawer as Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FunctionComponent, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { RouteResolver, Routes } from "../../App";
import { AppStore } from "../../AppStore";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { GlobalComponent } from "../../providers/GlobalComponentProvider";
import styles from "./styles/Drawer.css";

interface Props extends GlobalComponent {}

const Drawer: FunctionComponent<Props> = (props) => {
  const [state, actions] = AppStore.drawer.use();
  const { pathname } = useLocation();
  const { authLevel: authLayer } = useContext(AuthenticationContext);

  if (!props.renderCondition(authLayer, Routes[RouteResolver[pathname]]))
    return null;

  return (
    <Container
      variant="persistent"
      open={state.drawerToggled}
      className={styles.container}
      PaperProps={{ className: styles.paper }}
    >
      <Toolbar />
      <div className={styles.drawerHeader}></div>
      <Box sx={{ overflow: "auto" }}>
        <Divider />
      </Box>
    </Container>
  );
};

export default Drawer;
