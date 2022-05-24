import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import styles from "./Personal.module.css";
import React from "react";

function Personal() {
  return (
    <React.Fragment>
      <Navigator />
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box></Box>

          <Box></Box>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Personal;
