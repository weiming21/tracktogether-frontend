import Victory from "./victory";
import GroupContext from "../store/GroupContext";
import { useContext } from "react";

export default function BarChart(props) {
  const VictoryBar = Victory.VictoryBar;
  const VictoryTooltip = Victory.VictoryTooltip;
  const VictoryAxis = Victory.VictoryAxis;
  const VictoryChart = Victory.VictoryChart;
  const VictoryLabel = Victory.VictoryLabel;
  const grpCtx = useContext(GroupContext);
  console.log(grpCtx);

  // function transform_data(arr) {
  //   let initialJson = {
  //     Net: {
  //       y: 0,
  //       label: "Net",
  //     },
  //   };
  //   let temp = arr.reduce((json, current) => {
  //     const groupName = grpCtx.findGroupWithID(current.groupID).name;
  //     if (json[groupName]) {
  //       json[groupName].y += current.amount;
  //       json["Net"] += current.amount;
  //     } else {
  //       json[groupName] = {
  //         y: current.amount,
  //         label: groupName,
  //       };
  //       json["Net"] += current.amount;
  //     }
  //     return json;
  //   }, initialJson);
  //   temp = Object.values(temp).map((item) => {
  //     let container = {};
  //     container["y"] = item.y;
  //     container["label"] = `${item.label}:\n$${item.amout}`;
  //     container["fill"] =
  //       item.y >= 0
  //         ? item.label === "Net"
  //           ? "turquoise"
  //           : "green"
  //         : item.label === "Net"
  //         ? "pink"
  //         : "red";
  //     return container;
  //   });
  //   return temp;
  // }

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
