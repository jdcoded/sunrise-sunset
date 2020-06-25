import { useEffect, useState } from "react"

export const useSunData = ({lat, lng, formattedDate}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResult] = useState([]);  

  useEffect(() => {

    if (lat === 0 || lng === 0) {
      return
    }

    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${formattedDate}&formatted=0`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true);
          setResult(result.results);
        },
        (error) => {
          console.log('no results')
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [ lat, lng, formattedDate ])

  return {
    results, isLoaded, error
  }
}