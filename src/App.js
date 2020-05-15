import React from 'react';
import { useLocation } from './hooks/useLocation';
import { useSunData } from './hooks/useSunData';

function App() {
  const { latitude, longitude } = useLocation()

  // if (location) {
  //   console.log(location)
  //   return <p>Got location</p>
  // } else {
  //   console.log(location)
  //   return null
  // }

  const { results, isLoaded, error } = useSunData({
    lat: latitude,
    lng: longitude,
    date: new Date()
  })

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <ul>
        {Object.keys(results).map((key, i) => (
            <p key={i}>
              <span>{key}: </span>
              <span>{results[key]}</span>
            </p>
          )
        )}
        {/* {Object.keys(results).map((key, i) => {
          let date = results[key]
          

          }) */}
      </ul>
    )
  }
}

export default App