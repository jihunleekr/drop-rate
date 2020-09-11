import { log } from "mathjs";
import React, { useEffect, useState } from "react";
import {
    FlexibleWidthXYPlot, HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis,
    YAxis
} from "react-vis";

function calculateTrials(dropRate: number, targetRate: number) {
  return Math.ceil(log(1 - targetRate, 1 - dropRate));
}

interface RateChartProps {
  rate: number;
}

const RateChart: React.FC<RateChartProps> = ({ rate }) => {
  const [rateData, setRateData] = useState<{ x: number; y: number }[]>([]);
  const [targetData, setTargetData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (rate) {
      const data = [];
      const failure = 1 - rate;
      const maxTrials = calculateTrials(rate, 0.99);
      const targetTrials = calculateTrials(rate, 0.9);
      var stackedFailureRate = 1.0;
      for (let i = 1; i < maxTrials; i++) {
        stackedFailureRate = stackedFailureRate * failure;
        const p = { x: i, y: (1 - stackedFailureRate) * 100 };
        data.push(p);

        if (i === targetTrials) {
          setTargetData([p]);
        }
      }
      setRateData(data);
    }
  }, [rate]);

  return (
    <div>
      <FlexibleWidthXYPlot height={300} yDomain={[0, 100]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={v => `${v}회`} title="시도횟수" />
        <YAxis tickFormat={v => `${v}%`} title="누적확률" />
        <LineSeries data={rateData} opacity={0.5} />
        <MarkSeries data={targetData} />
      </FlexibleWidthXYPlot>
    </div>
  );
};

export default RateChart;
