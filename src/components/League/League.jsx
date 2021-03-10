import React from 'react';
import {useHistory} from 'react-router-dom';
import slug from 'slug';

function League({logoURL, sportType, title, id}) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/${slug(`${title} ${id}`)}`); 
  }

  return ( 
    <div>
      <img src={logoURL} alt={sportType} />
      <h3>{title}</h3>
      <p>{sportType}</p>
      <button onClick={handleClick}>Explore</button>
    </div>
  )
}

export default League;
