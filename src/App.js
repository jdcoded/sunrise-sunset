import React, { useState } from 'react';
import moment from "moment"
import { useLocation } from './hooks/useLocation';
import { useSunData } from './hooks/useSunData';

function App() {
  const { latitude, longitude } = useLocation()

  const [ date, setDate ] = useState(new Date())
  const formattedDate = moment(date).format('YYYY-MM-DD')

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

// Make this useDate hook obsolete before next meeting DONE
// Get bell curve chart loading on page