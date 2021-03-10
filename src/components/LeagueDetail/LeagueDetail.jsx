import React from 'react';
import {useParams} from 'react-router-dom';
import useJSON from '../../hooks/useJSON';

function LeagueDetail() {
  const {leagueTitleAndID} = useParams();
  const id = leagueTitleAndID.match(/-(\w+)$/)[1];
  const [loading, error, leagueInfo] = useJSON(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`, ['leagues', 0]);
  
  return ( 
    <div>
      {
        !loading && !error && (
          <section>
            <aside>
              <h2>{leagueInfo.strLeague}</h2>
              <ul>
                <li>Founded: {leagueInfo.intFormedYear}</li>
                <li>Country: {leagueInfo.strCountry}</li>
                <li>Sport Type: {leagueInfo.strSport}</li>
                <li>Gender: {leagueInfo.strGender}</li>
              </ul>
            </aside>
            {
              leagueInfo.strPoster &&
              <aside>
                <img src={leagueInfo.strPoster} alt="Banner Image" />
                "This is poster image"
              </aside>
            }
            <div>
              {
                leagueInfo.strDescriptionEN.split(/\n\r?/).filter(part => part).map((textChunk, i) => {
                  return <p key={i}>{textChunk}</p>
                })
              }
            </div>
          </section>
        )
      }
    </div>
  )
}

export default LeagueDetail;
