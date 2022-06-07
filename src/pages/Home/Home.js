//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import styles from "./Home.module.css";
import React, {
  useState,
  useEffect,
  useContext,
  // useReducer,
  // useRef,
} from "react";
import AuthContext from "../../store/AuthContext";
import DonutChart from "../../charts/DonutChart";
import BarChart from "../../charts/BarChart";
import LineChart from "../../charts/LineChart";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// import { unstable_batchedUpdates } from 'react-dom';

function Home() {
  const authCtx = useContext(AuthContext);

  //Random Quote

  const initialValues = {
    quote: [],
    pieData: [{ category: "Loading...", amount: 100 }],
    lineData: [],
    barData: [],
  };

  // const reducer = (state, [type, payload]) => {
  //   switch (type) {
  //     case 'quote':
  //       return {
  //         ...state,
  //         quote: payload,
  //       };
  //     case 'pie':
  //       return {
  //         ...state,
  //         pieData: payload,
  //       };
  //     case 'line':
  //       return {
  //         ...state,
  //         lineData: payload,
  //       };
  //     case 'bar':
  //       return {
  //         ...state,
  //         barData: payload,
  //       };
  //     default:
  //       throw new Error(`Unknown action type: ${type}`);
  //   }
  // };

  // const [state, dispatch] = useReducer(reducer, initialValues);

  const [data, setData] = useState(initialValues);
  // const [isDataFetched, setDataFetched] = useState(false);
  console.log(data);
  // Bar Chart
  const dummyBarData = [
    { y: 10, label: "Net:\n$10", fill: "turquoise" },
    { y: 20, label: "Friends:\n$20", fill: "green" },
    { y: -20, label: "Friends:\n$-20", fill: "red" },
    { y: 50, label: "Gym Group:\n$50", fill: "green" },
    { y: -40, label: "Movie Group:\n$-40", fill: "red" },
  ];

  const fetchData = async () => {
    console.log("entering home frame:" + JSON.stringify(data));
    const quote_result = await fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        return [data.content, data.author];
      });

    const pie_result = await fetch("http://localhost:8080/api/chart/piechart", {
      method: "PUT",
      body: JSON.stringify({
        _id: authCtx.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      })
      .catch((error) => console.log(error));

    const line_result = await fetch(
      "http://localhost:8080/api/chart/linechart",
      {
        method: "PUT",
        body: JSON.stringify({
          _id: authCtx.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });

    console.log("successfully made all api calls in home");
    if (quote_result && pie_result && line_result) {
      console.log("setting data");
      setData({
        quote: quote_result,
        pieData: pie_result,
        lineData: line_result,
        barData: dummyBarData,
      });
    }
  };

  useEffect(() => {
    if (authCtx.isDataFetched) {
      fetchData();
    }
  }, [authCtx]);

  return (
    <React.Fragment style={{ overflow: "auto" }}>
      <Navigator />
      <div style={{ display: "flex", minHeight: "100%", overflow: "auto" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

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
      </div>
    </React.Fragment>
  );
}

export default Home;
