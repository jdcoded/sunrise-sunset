import { useEffect, useState } from "react"

export const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {

    const sunriseCoords = localStorage.getItem('sunriseCoords')
    
    if (sunriseCoords) {
      console.log('location cache hit')
      setLocation(sunriseCoords)
      return
    }

    navigator.geolocation.getCurrentPosition(({coords}) => {
      localStorage.setItem('sunriseCoords', JSON.stringify(coords))
      setLocation(coords)
    })
  }, [])

  return location
}
