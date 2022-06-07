import Victory from "./victory";

export default function BarChart(props) {
  const VictoryBar = Victory.VictoryBar;
  const VictoryTooltip = Victory.VictoryTooltip;
  const VictoryAxis = Victory.VictoryAxis;
  const VictoryChart = Victory.VictoryChart;
  const VictoryLabel = Victory.VictoryLabel;

  return (
<<<<<<< HEAD
    <VictoryChart>
=======
    <VictoryChart domainPadding={30}>
      <VictoryLabel
        text="Debt Overview"
        x={225}
        textAnchor="middle"
        style={{ fontSize: 35, fill: "grey" }}
      />
>>>>>>> 605143036806bc5396b7985ef3fce55f23bc2c75
      <VictoryAxis tickFormat={() => ""} />
      <VictoryBar
        // standalone={false}
        horizontal
        labelComponent={
          <VictoryTooltip
<<<<<<< HEAD
            style={{ fontSize: "24px" }}
            pointerLength={30}
            cornerRadius={20}
=======
            style={{ fontSize: "20px" }}
            pointerLength={20}
            cornerRadius={30}
>>>>>>> 605143036806bc5396b7985ef3fce55f23bc2c75
            flyoutStyle={{
              fill: "white",
            }}
          />
        }
        animate
        data={props.data}
        //   y="total"
        style={{
          data: { fill: ({ datum }) => datum.fill },
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: "data",
                    mutation: (props) => ({
                      style: {
                        fill: props.style.fill,
                        width: 50,
                      },
                    }),
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: true }),
                  },
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    target: "data",
                    mutation: () => {},
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: false }),
                  },
                ];
              },
            },
          },
        ]}
      />
    </VictoryChart>
  );
}
