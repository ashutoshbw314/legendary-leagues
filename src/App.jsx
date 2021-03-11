import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import useJSON from './hooks/useJSON';
import LeagueDetailPage from './components/LeagueDetailPage/LeagueDetailPage';
import HomePage from './components/HomePage/HomePage';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import {CssBaseline} from '@material-ui/core';

function App() {
  const [loading, error, leagues] = useJSON('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php', ['leagues']);
  console.log('hello')
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            {loading && <LoadingIndicator />}
            {
              !loading && !error && <HomePage leagues={leagues} />
            }
          </Route>
          <Route exact path='/:leagueTitleAndID'>
            <LeagueDetailPage />
          </Route>
        </Switch>
        <CssBaseline />
      </div>
    </Router>
  );
}

export default App;
