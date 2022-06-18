import Victory from "./victory";

export default function DonutChart(props) {
  const VictoryPie = Victory.VictoryPie;
  const VictoryTooltip = Victory.VictoryTooltip;
  // const VictoryLegend = Victory.VictoryLegend;
  const VictoryContainer = Victory.VictoryContainer;
  const VictoryLabel = Victory.VictoryLabel;
  // const VictoryAxis = Victory.VictoryAxis;
  // const VictoryChart = Victory.VictoryChart;
  const graphicColor = ["#1e47f0", "#0096ff", "#00cfff", "#00ffff"];

  function transform_data(arr) {
    let temp = arr.reduce((json, current) => {
      if (json[current.category]) {
        json[current.category].amount += current.amount;
      } else {
        json[current.category] = {
          category: current.category,
          amount: current.amount,
        };
      }
      return json;
    }, {});
    return Object.values(temp);
  }

  function concatenate_labels(arr) {
    return arr.map((item) => {
      if (item.category != "Loading...") {
        const container = {};
        container["category"] = `${item.category}:\n$${item.amount}`;
        container["amount"] = item.amount;
        return container;
      } else {
        return item;
      }
    });
  }

  return (
    <VictoryContainer width={250} height={250} style={{ paddingTop: 40 }}>
      <VictoryLabel
        standalone={false}
        text="Breakdown by Category"
        x={120}
        y={25}
        textAnchor="middle"
        style={{ fontSize: 20, fill: "grey" }}
      />
      <VictoryPie
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{
              fill: "white",
            }}
          />
        }
        standalone={false}
        animate={{ easing: "exp" }}
        data={concatenate_labels(transform_data(props.data))}
        x="category"
        y="amount"
        width={240}
        height={240}
        colorScale={graphicColor}
        innerRadius={40}
      />
    </VictoryContainer>
    // <VictoryChart containerComponent={<VictoryContainer />}>
    //   <VictoryAxis
    //     style={{
    //       axis: { stroke: "transparent" },
    //       ticks: { stroke: "transparent" },
    //       tickLabels: { fill: "transparent" },
    //     }}
    //   />
    //   <VictoryLabel
    //     text="Breakdown by Category"
    //     x={200}
    //     textAnchor="middle"
    //     style={{ fontSize: 35, fill: "grey" }}
    //   />
    //   <VictoryPie
    //     labelComponent={
    //       <VictoryTooltip
    //         style={{ fontSize: 20 }}
    //         flyoutStyle={{
    //           fill: "white",
    //         }}
    //       />
    //     }
    //     standalone={false}
    //     animate={{ easing: "exp" }}
    //     data={concatenate_labels(props.data)}
    //     x="category"
    //     y="amount"
    //     colorScale={graphicColor}
    //     innerRadius={70}
    //     origin={{ y: 1000 }}
    //   />
    // </VictoryChart>
  );
}
