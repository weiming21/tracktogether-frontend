//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import styles from "./Outstanding.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/AuthContext";

function Outstanding() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  return (
    <React.Fragment style={{ overflow: "auto" }}>
      <Navigator />
      <div style={{ display: "flex", minHeight: "100%", overflow: "auto" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box></Box>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Outstanding;
