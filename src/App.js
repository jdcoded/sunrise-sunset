import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import moment from "moment"
import { useLocation } from './hooks/useLocation';
import { useSunData } from './hooks/useSunData';

function App() {
  const { latitude, longitude } = useLocation()

  const [ date, setDate ] = useState(new Date())
  const formattedDate = moment(date).format('YYYY-MM-DD')
  const todayMidnight = '2020-07-01' // hardcoded as string since setHours was causing infinite re-renders
  const tomorrowMidnight = '2020-07-02' // hardcoded as string since setHours was causing infinite re-renders
  // console.log(todayMidnight)
  // console.log(tomorrowMidnight)
  // debugger

  const { results, isLoaded, error } = useSunData({
    lat: latitude,
    lng: longitude,
    formattedDate: formattedDate
  })

  const chart = {
    labels: ['Today'],
    datasets: [
      {
        label: 'Sunrise-Sunset',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [
          // {
          //   x: '2020-07-01T04:03', // night
          //   y: 0
          // },
          // {
          //   x: '2020-07-01T04:42', // astronomical twilight begin
          //   y: 0
          // },
          // {
          //   x: '2020-07-01T05:17', // nautical twilight begin
          //   y: 1
          // },
          {
            x: '2020-07-01T12:46:33+00:00', // sunrise
            y: 2
          },
          {
            t: '2020-07-01T19:57:23+00:00', // noon
            y: 3
          },
          {
            t: '2020-07-02T03:08:13+00:00', // sunset
            y: 2
          },
          // {
          //   x: '2020-07-01T21:12:45', // nautical twilight end
          //   y: 1
          // },
          // {
          //   x: '2020-07-01T21:51:38', // astronomical twilight end
          //   y: 0
          // },
          // {
          //   x: '2020-07-01T21:51:38', // night
          //   y: 0
          // },
        ]
      }
    ]
  }

  return (
    <>
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
      <div>
        <Line
            data={chart}
            options={{
              scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                      unit: 'hour',
                      displayFormats: {
                        hour: 'HH:mm'
                      }
                    },
                    ticks: {
                      min: todayMidnight,
                      max: tomorrowMidnight
                    }
                }]
              }
          }}
          />
      </div>
    </>
  )
}

export default App

// Make this useDate hook obsolete before next meeting DONE
// Get bell curve chart loading on page
// Also look at chartjs to show sun rise data
// https://www.chartjs.org/samples/latest/scales/time/line-point-data.html