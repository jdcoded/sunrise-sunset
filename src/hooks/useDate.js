// import { useEffect, useState } from "react"
import { useEffect, useState } from "react"
import moment from "moment"

export const useDate = () => {
  const [ date, setDate ] = useState(new Date()) // move to App?
  
  // console.log('useDate, formattedDate: ', formattedDate)

  useEffect(() => {
    // console.log('useDate triggered')
  }, [])

  return {
    formattedDate: moment(date).format('YYYY-MM-DD'), // create util?
    setDate
  }
}

// Make this useDate hook obsolete before next meeting
// Get bell curve chart loading on page