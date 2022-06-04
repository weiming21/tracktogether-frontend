import Victory from './victory';

export default function DonutChart(props) {
  const VictoryPie = Victory.VictoryPie;
  const VictoryTooltip = Victory.VictoryTooltip;
  const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];

  function concatenate_labels(arr) {
    return arr.map((item) => {
      if (item._id != 'Loading...') {
        const container = {};
        container['category'] = `${item._id}:\n$${item.amount}`;
        container['amount'] = item.amount;
        return container;
      } else {
        return item;
      }
    });
  }

  return (
    <VictoryPie
      labelComponent={
        <VictoryTooltip
          flyoutStyle={{
            fill: 'white',
          }}
        />
      }
      animate={{ easing: 'exp' }}
      data={concatenate_labels(props.data)}
      x="category"
      y="amount"
      width={250}
      height={250}
      colorScale={graphicColor}
      innerRadius={40}
    />
  );
}
