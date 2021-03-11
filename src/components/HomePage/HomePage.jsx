import React from 'react';
import LogoPics from '../../data/LogoPics';
import LeagueCard from '../LeagueCard/LeagueCard';
import {Grid, makeStyles} from '@material-ui/core';
import banner from './banner.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    width: '370px',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      minWidth: '80%',
    },
  },
  highlight: {
    color: '#C0CA33',
    textShadow: '1px 1px 0px #fff',
  },
  banner: {
    width: '100%',
    height: '300px',
    marginBottom: '10px',
    backgroundImage: `url('${banner}')`,
    backgroundSize: 'cover',
    objectFit: 'cover',
    '& h1': {
      margin: 0,
      color: '#E65100',
      textShadow: '-1px -1px 0px #fff',
      textAlign: 'center',
      backgroundColor: 'rgba(125,50,80, 0.2)',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '4rem',
      },
    }
  }
}));

function HomePage({leagues}) {
  const classes = useStyles();
  const logoPics = new LogoPics();

  return (
    <div>
      <div className={classes.banner}>
        <h1>Legendary<br /> <span className={classes.highlight}>Leagues</span></h1>
      </div>
      <Grid container className={classes.root}>
        {
          leagues.map(league => {
            return (
              <Grid item key={league.idLeague}>
                <LeagueCard
                      id={league.idLeague}
                      logoURL={logoPics.url(league.idLeague)}
                      sportType={league.strSport} 
                      title={league.strLeague}
                   />
              </Grid>
            ) 
          })
        }
      </Grid>
    </div>
  );
}

export default HomePage;
