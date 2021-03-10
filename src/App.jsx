import React from 'react';
import useJSON from './hooks/useJSON';
import LogoPics from './data/LogoPics';

function App() {
  const logoPics = new LogoPics();
  const [loading, error, leagues] = useJSON('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php', ['leagues']);
  console.log('hello')
  return (
    <div className='app'>
      <ul>
        {loading && <p>Loading...</p>}
        {
          !loading && !error &&
          leagues.map(league => {
            return <li key={league.idLeague}>{league.strLeague} <img src={logoPics.url(league.idLeague)} alt="foo"/></li>;
          })
        }
      </ul>

    </div>
  );
}

export default App;
