import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Settings, PersonAdd, Logout } from "@mui/icons-material";
import React, { FunctionComponent } from "react";
import styles from './styles/NavigationBar.css'
import { AppStore } from "../../AppStore";

interface Props {
  onLogout: () => void;
  onClose: () => void;
  onOpen: (event) => void;
  open: boolean;
  anchor: Element | ((element: Element) => Element) | null | undefined;
}

const ProfileMenu: FunctionComponent<Props> = (props) => {

  const [accountState] = AppStore.account.use()
  const abbreviatedUsername = accountState.user?.name[0]

  return (
    <>
      <IconButton onClick={props.onOpen} size="small" sx={{ ml: 2 }}>
        <Avatar sx={{ width: 32, height: 32 }}>{abbreviatedUsername}</Avatar>
      </IconButton>
      <Menu
        anchorEl={props.anchor}
        open={props.open}
        onClose={props.onClose}
        onClick={props.onClose}
        PaperProps={{className: styles.profileMenu}}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar className={styles.Avatar} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={props.onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
