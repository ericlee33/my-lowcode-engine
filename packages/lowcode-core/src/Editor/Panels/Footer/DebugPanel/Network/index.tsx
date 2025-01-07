import React from 'react';
import styled from 'styled-components';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

interface INetworkProps {}

const Network: React.FC<INetworkProps> = (props) => {
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        let tar;
        if (params[1] && params[1].value !== '-') {
          tar = params[1];
        } else {
          tar = params[2];
        }
        return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    yAxis: {
      type: 'category',
      data: (function () {
        const list = [];
        for (let i = 1; i <= 11; i++) {
          list.push('Nov ' + i);
        }
        return list;
      })(),
    },
    xAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        silent: true,
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
        },
        data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
      },
      {
        name: 'Income',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'right',
        },
        data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-'],
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'right',
        },
        data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};

export default Network;
