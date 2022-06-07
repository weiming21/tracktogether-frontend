import Victory from "./victory";
//import { View, StyleSheet } from 'react-native';

export default function BarChart(props) {
  const VictoryBar = Victory.VictoryBar;
  const VictoryTooltip = Victory.VictoryTooltip;
  //   const VictoryVoronoiContainer = Victory.VictoryVoronoiContainer;
  const VictoryAxis = Victory.VictoryAxis;
  const VictoryChart = Victory.VictoryChart;

  return (
    <VictoryChart>
      <VictoryAxis tickFormat={() => ""} />
      <VictoryBar
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: "24px" }}
            pointerLength={30}
            cornerRadius={20}
            flyoutStyle={{
              fill: "white",
            }}
          />
        }
        animate
        data={props.data}
        //   y="total"
        style={{
          data: { fill: ({ datum }) => datum.fill, width: 80 },
        }}
        //   events={[
        //     {
        //       target: 'data',
        //       eventHandlers: {
        //         onMouseOver: () => {
        //           return [
        //             {
        //               target: 'data',
        //               mutation: () => ({ style: { opacity: 1, width: 100 } }),
        //             },
        //             {
        //               target: 'labels',
        //               mutation: () => ({ active: true }),
        //             },
        //           ];
        //         },
        //         onMouseOut: () => {
        //           return [
        //             {
        //               target: 'data',
        //               mutation: () => {},
        //             },
        //             {
        //               target: 'labels',
        //               mutation: () => ({ active: false }),
        //             },
        //           ];
        //         },
        //       },
        //     },
        //   ]}
      />
    </VictoryChart>
  );
}
