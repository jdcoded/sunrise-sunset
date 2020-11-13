import { useEffect, useState } from "react"

export const useSunData = ({lat, lng, formattedDate}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResult] = useState({});  

  useEffect(() => {

    if (lat === 0 || lng === 0) {
      console.log('invalid coords')
      return
    }

    const sunriseCache = localStorage.getItem('sunriseResult')
    
    if (sunriseCache) {
      console.log('cache hit')
      setIsLoaded(true);
      setResult(JSON.parse(sunriseCache).results);
      return
    }

    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${formattedDate}&formatted=0`)
      .then(res => res.json())
      .then((res) => {
        localStorage.setItem('sunriseResult', JSON.stringify(res))
        return res
      })
      .then(
        (result) => {
          // console.log(result)
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