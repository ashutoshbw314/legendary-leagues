import React from 'react';
import useJSON from './hooks/useJSON';

function App() {
  const [loading, error, leagues] = useJSON('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php', ['leagues']);

  return (
    <div className='app'>
      <ul>
        {loading && <p>Loading...</p>}
        {
          !loading && !error &&
          leagues.map(league => {
            return <li key={league.idLeague}>{league.strLeague}</li>;
          })
        }
      </ul>

    </div>
  );
}

export default App;
