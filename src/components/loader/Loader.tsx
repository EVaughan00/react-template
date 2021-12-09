import { Typography } from '@mui/material';
import React from "react";
import { ClipLoader } from 'react-spinners';
import styles from './styles/Loader.css';

const Loader = () => {

  return (
    <div className={styles.container}>
      <ClipLoader size={100} loading={true}/>
    </div>
  );
};

export default Loader;
