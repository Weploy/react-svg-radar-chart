import React from 'react';
import radar from './radar';

import '../radar.css';

const noSmoothing = points => {
  let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
  }
  return d + 'z';
};

const defaultOptions = {
  size: 300,
  height: 180,
  width: 180,
  axes: true, // show axes?
  scales: 3, // show scale circles?
  captions: true, // show captions?
  zoomDistance: 1.2, // where on the axes are the captions?
  smoothing: noSmoothing, // shape smoothing function
  captionMargin: 10,
  axisProps: () => ({ className: 'axis' }),
  scaleProps: () => ({ className: 'scale', fill: 'none' }),
  shapeProps: () => ({ className: 'shape' }),
  captionProps: () => ({
    className: 'caption',
    textAnchor: 'middle',
    fontSize: 10,
    fontFamily: 'sans-serif'
  })
};

const RadarChart = props => {
  const { data, captions, options, width, height } = props;
  let { size } = props;
  if (!size) {
    size = defaultOptions.size;
  }
  const chartOptions = { ...defaultOptions, ...options, size };
  const chart = radar(captions, data, chartOptions);
  const captionMargin = chartOptions.captionMargin;
  return (
    <svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`-${captionMargin} 0 ${size + captionMargin * 2} ${size}`}
    >
      {chart}
    </svg>
  );
};

export default RadarChart;
