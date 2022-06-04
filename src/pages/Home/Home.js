//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator from '../../components/navbar/Navigator';
import SideNavigator from '../../components/sidebar/SideNavigator';
import Box from '../../components/Box';
import styles from './Home.module.css';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import DonutChart from '../../charts/DonutChart';
import BarChart from '../../charts/BarChart';
import LineChart from '../../charts/LineChart';

function Home() {
  const authCtx = useContext(AuthContext);

  //Random Quote
  const [quote, setQuote] = useState([]);

  //Donut Chart
  const defaultPieData = [{ category: 'Loading...', amount: 100 }];
  const [pieData, setPieData] = useState(defaultPieData);

  //Line Chart
  const [lineData, setLineData] = useState([]);

  //Bar Chart
  // const defaultBarData = [
  //   { y: 1, label: 'How much others owe you:\n$10', fill: 'blue' },
  //   { y: 1, label: 'How much you owe:\n$50', fill: 'red' },
  //   { y: 1, label: 'Unrealised Net Balance:\n$-40', fill: 'grey' },
  // ];
  const dummyBarData = [
    { y: 20, label: 'How much others owe you:\n$10', fill: 'turquoise' },
    { y: -50, label: 'How much you owe:\n$50', fill: 'red' },
    { y: -30, label: 'Unrealised Net Balance:\n$-40', fill: 'blue' },
  ];
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    //Random Quote
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setQuote([data.content, data.author]))
      .catch((error) => setQuote(`Unable to retrieve quote. Error: ${error}`));

    //Donut Chart
    fetch('http://localhost:8080/api/chart/piechart', {
      method: 'PUT',
      body: JSON.stringify({
        _id: authCtx.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPieData(data.data);
        console.log(data.data);
      })
      .catch((error) => console.log(error));

    //Line Chart
    fetch('http://localhost:8080/api/chart/linechart', {
      method: 'PUT',
      body: JSON.stringify({
        _id: authCtx.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLineData(data.data);
        console.log(data.data);
      })
      .catch((error) => console.log(error));

    //Bar Chart
    setBarData(dummyBarData);
  }, [authCtx]);

  return (
    <div style={{ minHeight: '100%', overflow: 'auto' }}>
      <Navigator />
      <div style={{ display: 'flex', height: '100%', overflow: 'auto' }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <h2 className={styles.header}>Welcome Mr {authCtx.username}!</h2>
            <div style={{ display: 'flex' }}>
              {/* <div style={styles.subheader}>
                <h3> Spending</h3>
              </div> */}
              <div className={styles.piechart}>
                <DonutChart data={pieData} />;
              </div>
              <div className={styles.linechart}>
                <LineChart data={lineData} />;
              </div>
              <div className={styles.barchart}>
                <BarChart data={barData} />;
              </div>
            </div>
          </Box>

          <Box>
            <h4 className={styles.header}>Quote of the Day</h4>
            <span className={styles.quote}>"{quote[0]}"</span>

            <p>-{quote[1]}-</p>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Home;
