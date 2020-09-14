import React, { useEffect, useState } from "react";
import {
    FlexibleWidthXYPlot, HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis,
    YAxis
} from "react-vis";

import { calculateRate, calculateTrials, formatPercent, formatTrials } from "./Helper";

interface RateChartProps {
  rate: number;
  trials: number;
}

const RateChart: React.FC<RateChartProps> = ({ rate, trials }) => {
  const [rateData, setRateData] = useState<{ x: number; y: number }[]>([]);
  const [targetData, setTargetData] = useState<{ x: number; y: number }[]>([]);
  const [currentData, setCurrentData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (rate) {
      const data = [];
      const maxTrials = calculateTrials(rate, 0.99);
      const targetTrials = calculateTrials(rate, 0.9);

      const step = Math.floor(maxTrials / 20);

      for (let i = 1; i < maxTrials; i += step) {
        data.push({ x: i, y: calculateRate(rate, i) });
      }

      setCurrentData([{ x: trials, y: calculateRate(rate, trials) }]);
      setTargetData([{ x: targetTrials, y: calculateRate(rate, targetTrials) }]);
      setRateData(data);
    }
  }, [rate, trials]);

  return (
    <div>
      <FlexibleWidthXYPlot height={300} yDomain={[0, 1]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={v => formatTrials(v)} title="시도횟수" />
        <YAxis tickFormat={v => formatPercent(v)} title="누적확률" />
        <LineSeries data={rateData} opacity={0.5} />
        <MarkSeries data={targetData} />
        <MarkSeries data={currentData} />
      </FlexibleWidthXYPlot>
    </div>
  );
};

export default RateChart;
