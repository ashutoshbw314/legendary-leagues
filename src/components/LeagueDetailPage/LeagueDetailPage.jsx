import React from 'react';
import {useParams} from 'react-router-dom';
import useJSON from '../../hooks/useJSON';
import {Card, CardMedia, CardContent, makeStyles} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faFutbol, faMars, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesomeFlag, faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

const useStyles = makeStyles(theme => ({
  'topCard': {
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
    display: 'flex',
    color: 'white',
    fontSize: '1rem',
    backgroundColor: '#c33764',
    backgroundImage: 'linear-gradient(to left, #c33764, #1d2671)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1.6rem',
    borderRadius: '15px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    '& img': {
      border: '5px solid mistyrose',
      alignSelf: 'center',
      height: '250px',
      objectFit: 'cover',
      objectPosition: '0 -50px'
    },
    marginTop: '10px',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '1.5rem',
    width: '30px !important',
    display: 'inline-flex',
    marginRight: '10px',
  },
  posterContainer: {
    borderRadius: '15px',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    '& li': {
      margin: '10px 0' 
    }
  },
  container: {
    width: '90%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  desc: {
    fontSize: '1.1rem',
    color: '#333'
  },
  banner: {
    width: '100%',
  },
  socialIconsWrapper: {
    width: '200px',
    margin: '20px auto',
    display: 'flex',
    justifyContent: 'space-between',
    '& a': {
      color: '#333',
      fontSize: '2.4rem'
    }
  },
  fbIcon: {
    '&:hover': {
      color: '#246ca6',
    }
  },
  twIcon: {
    '&:hover': {
      color: '#53a8ed',
    }
  },
  ytIcon: {
    '&:hover': {
      color: '#e03f2d',
    }
  },
}))

function LeagueDetailPage() {
  const {leagueTitleAndID} = useParams();
  const id = leagueTitleAndID.match(/-(\w+)$/)[1];
  const [loading, error, leagueInfo] = useJSON(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`, ['leagues', 0]);

  const classes = useStyles();
  
  return ( 
    <div>
      {
        loading && <LoadingIndicator />
      }
      {
        !loading && !error && (
          <>
            <img src={leagueInfo.strBanner} className={classes.banner} />
            <div className={classes.container}>
              <Card className={classes.topCard}>
                <CardContent style={{padding: 0}}>
                  <h2 style={{margin: 0}}>{leagueInfo.strLeague}</h2>
                  <ul className={classes.list}>
                    <li>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className={classes.icon}/>
                      Founded: {leagueInfo.intFormedYear}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faFontAwesomeFlag} transform={{ rotate: -10 }} className={classes.icon}/>
                      Country: {leagueInfo.strCountry}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faFutbol} className={classes.icon}/>
                      Sport Type: {leagueInfo.strSport}
                    </li>
                    <li>
                      {
                        leagueInfo.strGender.toLowerCase() == "male" ?
                          <FontAwesomeIcon icon={faMars} className={classes.icon}/> :
                          leagueInfo.strGender.toLowerCase() == 'female' ? 
                            <FontAwesomeIcon icon={faVenus} className={classes.icon}/> :
                            <FontAwesomeIcon icon={faVenusMars} className={classes.icon}/>
                      }
                      Gender: {leagueInfo.strGender}
                    </li>
                  </ul>
                </CardContent>
                {
                  leagueInfo.strPoster &&
                  <CardMedia 
                    component="img"
                    alt="poster"
                    image={leagueInfo.strPoster}
                    title="poster" 
                    className={classes.posterContainer}
                  />
                }
              </Card>
              <div className={classes.desc}>
                {
                  leagueInfo.strDescriptionEN.split(/\n\r?/).filter(part => part).map((textChunk, i) => {
                    return <p key={i}>{textChunk}</p>
                  })
                }
              </div>
              <div className={classes.socialIconsWrapper}>
                <a href={'https://' + leagueInfo.strTwitter} target='_blank'>
                  <FontAwesomeIcon icon={faTwitter} className={classes.twIcon} />
                </a>
                <a href={'https://' + leagueInfo.strFacebook} target='_blank'>
                  <FontAwesomeIcon icon={faFacebook} className={classes.fbIcon} />
                </a>
                <a href={'https://' + leagueInfo.strYoutube} target='_blank'>
                  <FontAwesomeIcon icon={faYoutube} className={classes.ytIcon} />
                </a>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default LeagueDetailPage;
