import { Typography } from '@mui/material';
import React from "react";
import { ClipLoader } from 'react-spinners';
import styles from '../styles/Account.css';

const Loading = () => {

  return (
    <div className={styles.loaderContainer}>
      <ClipLoader size={100} loading={true}/>
    </div>
  );
};

export default Loading;
