import Victory from "./victory";

export default function DonutChart(props) {
  const VictoryLine = Victory.VictoryLine;
  const VictoryChart = Victory.VictoryChart;
  const VictoryVoronoiContainer = Victory.VictoryVoronoiContainer;
  const VictoryAxis = Victory.VictoryAxis;
  const VictoryTooltip = Victory.VictoryTooltip;

  function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);
    return date;
  }

  function filter_and_sort_dates(arr) {
    const filtered_arr = arr.filter(
      (item) =>
        new Date(`${item._id.year}-${item._id.month}`) > subtractMonths(6)
    );
    console.log(filtered_arr);

    const sorted_arr = filtered_arr.sort(
      (a, b) =>
        new Date(`${a._id.year}-${a._id.month}`) -
        new Date(`${b._id.year}-${b._id.month}`)
    );
    return sorted_arr;
  }

  function get_past_n_months(date, n) {
    let result = [];
    for (let i = n; i >= 0; i--) {
      result.push(subtractMonths(i).getMonth());
    }
    console.log(result);
    return result;
  }

  function map_month_to_value(arr) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const required_months = get_past_n_months(new Date(), 5).map(
      (item) => months[item]
    );

    let result = [];
    required_months.forEach((month) => {
      const item = arr.find((item) => month == months[item._id.month - 1]);
      console.log(item);
      if (item) {
        const container = {};
        container["month"] = months[item._id.month - 1];
        container["amount"] = item.amount;
        result.push(container);
      } else {
        result.push({ month: month, amount: 0 });
      }
    });
    console.log(result);
    return result;
  }

  function transform_data(arr) {
    return map_month_to_value(filter_and_sort_dates(arr));
  }

  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `amount: $${datum.amount}`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: "15px" }}
              flyoutStyle={{ fill: "white" }}
            />
          }
        />
      }
    >
      <VictoryAxis />
      <VictoryLine
        animate={{ easing: "exp" }}
        data={transform_data(props.data)}
        style={{
          data: {
            stroke: "tomato",
            strokeWidth: ({ active }) => (active ? 5 : 2),
          },
          labels: { fill: "tomato" },
        }}
        x="month"
        y="amount"
      />
    </VictoryChart>
  );
}
