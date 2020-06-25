import { useEffect, useState } from "react"
// import moment from "moment"

export const useSunData = ({lat, lng, formattedDate}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResult] = useState([]);  
  // console.log(lat, lng, formattedDate)

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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