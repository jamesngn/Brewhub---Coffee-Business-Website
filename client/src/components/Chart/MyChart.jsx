import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = () => {
  const chartData = {
    options: {
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 120, 150],
      },
    ],
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={350}
    />
  );
};

export default ChartComponent;
