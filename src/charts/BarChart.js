import Victory from "./victory";

export default function BarChart(props) {
  const VictoryBar = Victory.VictoryBar;
  const VictoryTooltip = Victory.VictoryTooltip;
  const VictoryAxis = Victory.VictoryAxis;
  const VictoryChart = Victory.VictoryChart;
  const VictoryLabel = Victory.VictoryLabel;

  return (
    <VictoryChart domainPadding={30}>
      <VictoryLabel
        text="Debt Overview"
        x={225}
        textAnchor="middle"
        style={{ fontSize: 35, fill: "grey" }}
      />
      <VictoryAxis tickFormat={() => ""} />
      <VictoryBar
        // standalone={false}
        horizontal
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: "20px" }}
            pointerLength={20}
            cornerRadius={30}
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
