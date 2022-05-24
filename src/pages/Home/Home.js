import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import styles from "./Home.module.css";
import React, { useState, useEffect } from "react";

function Home() {
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setQuote([data.content, data.author]))
      .catch((error) => setQuote(`Unable to retrieve quote. Error: ${error}`));
  }, []);

  return (
    <React.Fragment>
      <Navigator />
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <h2 className={styles.header}>Welcome Mr Teo!</h2>
            <p style={{ padding: 150 }}>
              <h2>Dashboard</h2>
            </p>
          </Box>

          <Box>
            <h4 className={styles.header}>Quote of the Day</h4>
            <span className={styles.quote}>"{quote[0]}"</span>
            <p>-{quote[1]}-</p>
          </Box>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
