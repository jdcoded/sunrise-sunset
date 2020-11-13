import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import moment from "moment";
import "./App.css";
import { useLocation } from "./hooks/useLocation";
import { useSunData } from "./hooks/useSunData";

function App() {
  const { latitude, longitude } = useLocation();

  const [date, setDate] = useState(new Date());
  const formattedDate = moment(date.toISOString()).format("YYYY-MM-DD");
  const todayMidnight = formattedDate;
  const tomorrowMidnight = moment(date.toISOString()).add(1, "d").format("YYYY-MM-DD");

  const { results, isLoaded, error } = useSunData({
    lat: latitude,
    lng: longitude,
    formattedDate: formattedDate,
  });

  const resultsArray = Object.keys(results);

  const formattedData = resultsArray
    .map((key, i) => {
      if (typeof results[key] == "string") {
        return {
          x: moment(results[key]).toDate(),
        };
      }
      return null;
    })
    .filter((o) => o)
    .sort((a, b) => a.x.valueOf() - b.x.valueOf())
    .map((o, i) => {
      return {
        ...o,
        i,
        y:
          i < Math.floor(resultsArray.length / 2)
            ? i
            : resultsArray.length - 2 - i,
      };
    });


  const chart = {
    labels: ["Today"],
    datasets: [
      {
        label: "Sunrise-Sunset",
        fill: false,
        lineTension: 0.4, // explore this to give line more of a bell curve
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        // data is null on first render and doesn't get updated via map
        data: [
          formattedData[Object.keys(formattedData)[0]],
          formattedData[Object.keys(formattedData)[4]],
          formattedData[Object.keys(formattedData)[8]]
        ],
      },
    ],    
  };

  const firstDataVal = formattedData[Object.keys(formattedData)[0]]
  const lastDataVal = formattedData[Object.keys(formattedData)[8]]
  
  let firstDateTime = todayMidnight
  let lastDateTime = tomorrowMidnight

  if (firstDataVal && lastDataVal) {
    firstDateTime = Object.values(firstDataVal)
    lastDateTime = Object.values(lastDataVal)
  }

  const bgArray = [
    /* 0 */ "#000000",
    /* 1 */ "#000000",
    /* 2 */ "#000000",
    /* 3 */ "linear-gradient(135deg, #5e7fb1 0%, #dce8f7 61%, #eff1f4 72%, #fce1a8 88%, #f7ec86 100%)", // dawn
    /* 4 */ "linear-gradient(135deg, #5e7fb1 0%, #dce8f7 61%, #eff1f4 72%, #fce1a8 88%, #f7ec86 100%)", // dawn
    /* 5 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 6 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 7 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 8 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 9 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 10 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 11 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 12 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 13 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 14 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 15 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 16 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 17 */ "linear-gradient(135deg, #a2e0f9 6%, #cef5fc 39%, #eafaeb 70%, #fefcd3 88%, #fdf4ba 100%)", // daylight
    /* 18 */ "linear-gradient(135deg, #171c33 0%, #525f83 42%, #848896 63%, #bb9d78 78%, #f6e183 100%)", // sunset
    /* 19 */ "linear-gradient(135deg, #171c33 0%, #525f83 42%, #848896 63%, #bb9d78 78%, #f6e183 100%)", // magic hour 1
    /* 20 */ "linear-gradient(135deg, #171c33 0%, #525f83 42%, #848896 63%, #bb9d78 78%, #f6e183 100%)", // magic hour 1
    /* 21 */ "#000000",
    /* 22 */ "#000000",
    /* 23 */ "#000000",
  ];

  const background = {
    background: bgArray[new Date().getHours()],
  };

  return (
    <div className="container" style={background}>
      <div>
        <input
          id="date"
          type="date"
          value={formattedDate}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          disabled={!isLoaded}
        />
        {error ? (
          <div>Error: {error.message}</div>
        ) : !isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div className="chart-wrapper">
            <Line
              data={chart}
              options={{
                annotation: {
                  annotations: [
                    {
                      drawTime: "afterDatasetsDraw",
                      type: "line",
                      mode: "vertical",
                      scaleID: "x-axis-0",
                      value: new Date(),
                      borderWidth: 2,
                      borderColor: "#ffd630",
                      label: {
                        content: "Current Time",
                        enabled: true,
                        position: "center",
                      },
                    },
                  ],
                },
                maintainAspectRatio: false,
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      time: {
                        unit: "hour",
                        displayFormats: {
                          hour: "hA",
                        },
                      },
                      ticks: {
                        min: firstDateTime[0],
                        max: lastDateTime[0],
                      },
                      // ticks: {
                      //   min: todayMidnight,
                      //   max: tomorrowMidnight,
                      // },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      display: false,
                      gridLines: {
                        display: false,
                      },
                      ticks: {
                        suggestedMin: 0,
                        suggestedMax: 16,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
