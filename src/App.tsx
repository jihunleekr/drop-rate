import "./App.css";
import "../node_modules/react-vis/dist/style.css";

import { log } from "mathjs";
import React, { useState } from "react";
import {
    HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis
} from "react-vis";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      maxWidth: 600
    }
  })
);

function calculateTrials(dropRate: number, targetRate: number) {
  return Math.ceil(log(1 - targetRate, 1 - dropRate));
}

function App() {
  const classes = useStyles();
  const [dropRate, setDropRate] = useState<string>("");
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [markData, setMarkData] = useState<{ x: number; y: number }[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(event.target.value) / 100;
    const d = [];
    const nothingRate = 1 - v;
    const maxRate = calculateTrials(v, 0.99);
    const targetTrials = calculateTrials(v, 0.9);
    console.log(targetTrials);
    var stackedNothingRate = 1.0;
    for (let i = 1; i < maxRate; i++) {
      stackedNothingRate = stackedNothingRate * nothingRate;
      const p = { x: i, y: (1 - stackedNothingRate) * 100 };
      d.push(p);

      if (i === targetTrials) {
        setMarkData([p]);
      }
    }

    setData(d);
    setDropRate(event.target.value);
  };

  return (
    <div className={classes.root}>
      <h1>DROPRATE</h1>
      <form noValidate autoComplete="off">
        <TextField id="outlined-basic" label="%" variant="outlined" onChange={handleChange} value={dropRate} />
      </form>
      <XYPlot height={300} width={600} yDomain={[0, 100]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries data={data} curve={"curveMonotoneX"} opacity={0.5} />
        <MarkSeries data={markData} />
      </XYPlot>
    </div>
  );
}

export default App;
