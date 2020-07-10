import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import moment from "moment"
import { useLocation } from './hooks/useLocation';
import { useSunData } from './hooks/useSunData';

function App() {
  const { latitude, longitude } = useLocation()

  const [ date, setDate ] = useState(new Date())
  const formattedDate = moment(date).format('YYYY-MM-DD')
  const todayMidnight = formattedDate
  const tomorrowMidnight = moment(date).add(1,'d').format('YYYY-MM-DD')
  // console.log(todayMidnight)
  // console.log(tomorrowMidnight)
  // debugger

  const { results, isLoaded, error } = useSunData({
    lat: latitude,
    lng: longitude,
    formattedDate: formattedDate
  })

  // console.log('results: ', results)

  // let sunriseTime, solarNoon, sunsetTime

  const resultsArray = Object.keys(results)

  const formattedData = resultsArray.map((key, i) => {
    // console.log('result: ', results[key])
    if (typeof results[key] == 'string') {
      return {
        x: moment(results[key]).toDate(),
        // debug: moment(results[key]).format('HH:mm'),
        // key
        // y: i
      }
    }
    return null
  }).filter((o) => o ).sort((a, b) => a.x.valueOf() - b.x.valueOf()).map((o, i) => {
    return {
      ...o,
      i,
      y: i < Math.floor(resultsArray.length / 2) ? i : resultsArray.length - 2 - i
    }
  })
  
  console.log('formattedData: ', formattedData)

  const chart = {
    labels: ['Today'],
    datasets: [
      {
        label: 'Sunrise-Sunset',
        fill: false,
        lineTension: 0.1, // explore this to give line more of a bell curve
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        // data is null on first render and doesn't get updated via map
        data: formattedData
      },
      {
        label: 'currentTime',
        fill: false,
        lineTension: 0.1, // explore this to give line more of a bell curve
        radius: 6,
        backgroundColor: 'orange',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        // data is null on first render and doesn't get updated via map
        data: [{
          x: new Date(),
          y: 2
        }]
      }
    ]
  }

  const bgArray = [
    /* 0 */ '#000000',
    /* 1 */ '#000000',
    /* 2 */ '#000000',
    /* 3 */ 'linear-gradient(135deg, #5e7fb1 0%, #dce8f7 61%, #eff1f4 72%, #fce1a8 88%, #f7ec86 100%)', // dawn
    /* 4 */ 'linear-gradient(135deg, #5e7fb1 0%, #dce8f7 61%, #eff1f4 72%, #fce1a8 88%, #f7ec86 100%)', // dawn
    /* 5 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 6 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 7 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 8 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 9 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 10 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 11 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 12 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 13 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 14 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 15 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 16 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 17 */ 'linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)', // daylight
    /* 18 */ 'linear-gradient(135deg, #171c33 0%, #525f83 42%, #848896 63%, #bb9d78 78%, #f6e183 100%)', // sunset
    /* 19 */ 'linear-gradient(135deg, #171c33 0%, #525f83 42%, #848896 63%, #bb9d78 78%, #f6e183 100%)', // magic hour 1
    /* 20 */ 'linear-gradient(135deg, #171c33 0%, #525f83 42%, #848896 63%, #bb9d78 78%, #f6e183 100%)', // magic hour 1
    /* 21 */ '#000000',
    /* 22 */ '#000000',
    /* 23 */ '#000000',    
  ]

  const background = {
    background: bgArray[new Date().getHours()]
  }

  return (
    <div style={background}>
      <div>
        <input id="date" type="date" value={formattedDate} onChange={(e) => {
          setDate(e.target.value)
        }} disabled={!isLoaded}/>
        {
          error ? (<div>Error: {error.message}</div>) : (
            !isLoaded ? (<div>Loading...</div>) :
            (
              <Line
                data={chart}
                // why is data coming from chart but options isn't?
                options={{                  
                  scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                          unit: 'hour',
                          displayFormats: {
                            hour: 'hA'
                          }
                        },
                        ticks: {
                          min: todayMidnight,
                          max: tomorrowMidnight
                        },
                        gridLines: {
                          display:false
                        }
                    }],
                    yAxes: [{
                      display: false,
                      gridLines: {
                        display:false
                      },
                      ticks: {
                        suggestedMin: 0,
                        suggestedMax: 8
                      },
                    }],
                  }
              }}
            />  
            )
          )
        }
      </div>
    </div>
  )
}

export default App

// Make this useDate hook obsolete before next meeting DONE
// Get bell curve chart loading on page
// Also look at chartjs to show sun rise data
// https://www.chartjs.org/samples/latest/scales/time/line-point-data.html

// Add labels to all data points on chart
// Kill all graph UI as much as possible (y axis, legend, background grid, etc.)
// Explore a gradient background for chart
// Make curve smoother