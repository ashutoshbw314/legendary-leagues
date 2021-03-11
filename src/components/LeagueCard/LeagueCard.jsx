import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Card, CardMedia, CardContent, makeStyles} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import slug from 'slug';

const useStyles = makeStyles({
  root: {
    width: '330px',
    height: '350px',
    backgroundColor: '#ff5f6d',
    backgroundImage: 'linear-gradient(to top, #ff5f6d, #ffc371)',
    margin: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    borderRadius: '15px',
  },
  media: {
    height: 140,
    objectFit: 'contain'
  },
  button: {
    color: '#222',
    textTransform: 'none',
    justifySelf: 'flex-end',
    backgroundColor: '#FF8A65',
    '&:hover': {
      backgroundColor: '#FFAB91',
    },
  }
});

function LeagueCard({logoURL, sportType, title, id}) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push(`/${slug(`${title} ${id}`)}`); 
  }

  return ( 
    <Card className={classes.root}>
      <CardMedia
        component='img'
        image={logoURL}
        className={classes.media}
        title={title}
        style={{height: '100px', marginTop: '15px'}}
        alt={title}
      />
      <CardContent style={{height: '150px'}}>
        <h2>{title}</h2>
        <p>Sports Type: <b>{sportType}</b></p>
      </CardContent>
      <Button onClick={handleClick} variant="contained" color="primary" className={classes.button}>
        Explore 
        <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '0.5rem'}} />

      </Button>
    </Card>
  )
}

export default LeagueCard;
