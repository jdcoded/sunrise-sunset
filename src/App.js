import React, {
  useEffect,
  useState
} from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResult] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    // Redondo Beach, 33.8492 N, 118.3884 W
    fetch("https://api.sunrise-sunset.org/json?lat=33.8492&lng=-118.3884")
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <ul>
        { Object.keys(results).map((key, i) => (
          <p key={i}>
            <span>{key}: </span>
            <span>{results[key]}</span>
          </p>
        )
        )}
      </ul>
    )
  }
}

export default App