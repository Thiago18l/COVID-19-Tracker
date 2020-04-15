import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

//styles
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart = (
    dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infectados',
            borderColor: '#02e7c1',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  const barChart = (
    confirmed
      ? (
        <Bar 
        data={{
          labels: ['Infectados', 'Recuperados', 'Mortos'],
          datasets: [{
            label: 'Pessoas',
            backgroundColor:[
              'rgba(2, 231, 193, 0.5)',
              'rgba(0 , 255, 0, 0.5)',         
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [ confirmed.value, recovered.value, deaths.value]
          }]
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Estado atual no ${country}` },

        }}
        />
      ) : null
  )
  return (
  <div className={styles.container}>
      { country ?  barChart : lineChart }
  </div>
  )
};

export default Chart;
