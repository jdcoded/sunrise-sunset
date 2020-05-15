import { useEffect, useState } from "react"

export const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      setLocation(coords)
    })
  }, [])

  return location
}
