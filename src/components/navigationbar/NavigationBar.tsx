import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { RouteResolver, Routes } from "../../App";
import { AppStore } from "../../AppStore";
import { ENV } from "../../env";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import HamburgerToggle from "./HamburgerToggle";
import ProfileMenu from "./ProfileMenu";

import styles from "./styles/NavigationBar.css";

interface Props {
  
}

const NavigationBar: FunctionComponent<Props> = (props) => {
  const [state, actions] = AppStore.drawer.use(); 
  const authContext = React.useContext(AuthenticationContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { location, push } = useHistory()

  const toDashboard = () => push(Routes.Dashboard)

  const handleOpenProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseProfileMenu();
    authContext.logout();
  };

  const handleToggleDrawer = () => {
    actions.toggleDrawer(!state.drawerToggled);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar className={styles.bar}>
        <div className={styles.columnLeft} >
          <HamburgerToggle onToggle={handleToggleDrawer} />
          <Typography variant="h6">{RouteResolver[location.pathname]}</Typography>
        </div>
        <div className={styles.columnRight} >
          <Button color="inherit" onClick={toDashboard}>Dashboard</Button>
          <ProfileMenu
            open={open}
            anchor={anchorEl}
            onOpen={handleOpenProfileMenu}
            onClose={handleCloseProfileMenu}
            onLogout={handleLogout}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
