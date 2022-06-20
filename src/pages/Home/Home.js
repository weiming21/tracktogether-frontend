//import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from "../../components/Box";
import styles from "./Home.module.css";
import React, {
  // useState,
  useEffect,
  useContext,
  useReducer,
  // useRef,
} from "react";
import AuthContext from "../../store/AuthContext";
import DonutChart from "../../charts/DonutChart";
import BarChart from "../../charts/BarChart";
import LineChart from "../../charts/LineChart";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import FilterContext from "../../store/FilterContext";
// import { unstable_batchedUpdates } from 'react-dom';

function Home() {
  const authCtx = useContext(AuthContext);
  console.log("rendering home");
  // console.log(authCtx);
  const filterCtx = useContext(FilterContext);
  console.log(filterCtx);

  const initialValues = {
    quote: [],
    pieData: [{ category: "Loading...", amount: 100 }],
    lineData: [],
    barData: [],
  };

  // const reducer = (state, [type, payload]) => {
  //   switch (type) {
  //     case "quote":
  //       return {
  //         ...state,
  //         quote: payload,
  //       };
  //     case "pie":
  //       return {
  //         ...state,
  //         pieData: payload,
  //       };
  //     case "line":
  //       return {
  //         ...state,
  //         lineData: payload,
  //       };
  //     case "bar":
  //       return {
  //         ...state,
  //         barData: payload,
  //       };
  //     default:
  //       throw new Error(`Unknown action type: ${type}`);
  //   }
  // };

  const reducer = (state, payload) => {
    return payload;
  };

  const [data, dispatch] = useReducer(reducer, initialValues);

  // const [data, setData] = useState(initialValues);

  // Bar Chart
  const dummyBarData = [
    { y: 10, label: "Net:\n$10", fill: "turquoise" },
    { y: 20, label: "Friends:\n$20", fill: "green" },
    { y: -20, label: "Friends:\n$-20", fill: "red" },
    { y: 50, label: "Gym Group:\n$50", fill: "green" },
    { y: -40, label: "Movie Group:\n$-40", fill: "red" },
  ];

  function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    let isCancelled = false;
    console.log("entering home useEffect frame");
    const fetchData = async () => {
      const quote_result = await fetch(
        "https://goquotes-api.herokuapp.com/api/v1/all?type=tag&val=money"
      )
        .then((response) => response.json())
        .then((data) => {
          let quote = data.quotes[getRndInteger(503)];
          return [quote.text, quote.author];
        });

      await timeout(500);

      if (!isCancelled) {
        console.log("setting all data in Home");
        dispatch({
          quote: quote_result,
          pieData: filterCtx.localData,
          lineData: filterCtx.localData,
          barData: dummyBarData,
        });
      }
    };

    if (authCtx.isDataFetched && filterCtx.isDataFetched) {
      fetchData();
    }
    //cleanup function is executed when useEffect is called again or on unmount
    return () => {
      isCancelled = true;
    };
  }, [authCtx, filterCtx]);

  return (
    <div className={styles.right}>
      <Box>
        <h2 className={styles.header}>Welcome Mr {authCtx.username}!</h2>
        <Container>
          <Row>
            <Col>
              <DonutChart data={data.pieData} />
            </Col>
            <Col style={{ position: "relative" }}>
              {data.lineData.length != 0 ? (
                <LineChart data={data.lineData} />
              ) : (
                <div className={styles.spinner}>
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
            </Col>
            <Col style={{ position: "relative" }}>
              {data.barData.length == 0 ? (
                <div className={styles.spinner}>
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <BarChart data={data.barData} />
              )}
            </Col>
          </Row>
        </Container>
      </Box>

      <Box>
        <h4 className={styles.header}>Quote of the Day</h4>
        {data.quote.length == 0 ? (
          <Col style={{ position: "relative" }}>
            <div className={styles.spinner}>
              <Spinner animation="border" variant="primary" />
            </div>
            <br></br>
            <br></br>
          </Col>
        ) : (
          <div>
            <span className={styles.quote}>"{data.quote[0]}"</span>
            <p>-{data.quote[1]}-</p>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Home;
