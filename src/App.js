import React from 'react';
import { useLocation } from './hooks/useLocation';
import { useDate } from './hooks/useDate';
import { useSunData } from './hooks/useSunData';

function App() {
  const { latitude, longitude } = useLocation()

  const { formattedDate, setDate } = useDate()

  const { results, isLoaded, error } = useSunData({
    lat: latitude,
    lng: longitude,
    formattedDate: formattedDate
  })

  return (
    <div>
      <input id="date" type="date" value={formattedDate} onChange={(e) => {
        setDate(e.target.value)
      }} disabled={!isLoaded}/>
      {
        error ? (<div>Error: {error.message}</div>) : (
          !isLoaded ? (<div>Loading...</div>) :
          (              
            <ul>
              {Object.keys(results).map((key, i) => (
                  <li key={i}>
                    <span>{key}: </span>
                    <span>{results[key]}</span>
                  </li>
                )
              )}
            </ul>
          )
        )
      }
    </div>
  )
}

export default App