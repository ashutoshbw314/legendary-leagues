import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import useJSON from './hooks/useJSON';
import LogoPics from './data/LogoPics';
import League from './components/League/League';
import LeagueDetail from './components/LeagueDetail/LeagueDetail';

function App() {
  const logoPics = new LogoPics();
  const [loading, error, leagues] = useJSON('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php', ['leagues']);
  console.log('hello')
  return (
    <Router>
      <div className='app'>
        {loading && <p>Loading...</p>}
        <Switch>
          <Route exact path='/'>
            {
              !loading && !error &&
              leagues.map(league => {
                return <League
                          key={league.idLeague}
                          id={league.idLeague}
                          logoURL={logoPics.url(league.idLeague)}
                          sportType={league.strSport} 
                          title={league.strLeague}
                       />;
              })
            }
          </Route>
          <Route exact path='/:leagueTitleAndID'>
            <LeagueDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
