import React from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loading: {
    margin: '100px auto',
    width: '100px'
  }
}))

function LoadingIndicator() {
  const classes = useStyles();
  
  return ( 
    <div className={classes.loading}>
      <CircularProgress style={{width: '100px', height: '100px'}} />
    </div>
  )
}

export default LoadingIndicator;
