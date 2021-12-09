import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@mui/material';
import React from "react";
import styles from '../styles/LandingPage.css';

const Body = () => {

  const quoteStart = "React Template"

  const { loginWithPopup } = useAuth0()

  const handleOnClick = () => {
    loginWithPopup()
  }

  return (
    <div className={`${styles.body} "fade-in-container"`}>
      <div className={styles.columnCenter}>
        <img width={200} height={200} src='./icons/welcome.png' />
        <Button
          size="large"
          variant="contained"
          className={styles.button}
          onClick={handleOnClick}
        >
          Login
        </Button>
        <Typography variant="h3" className={styles.text} >{quoteStart}</Typography>
      </div>
    </div>
  );
};

export default Body;