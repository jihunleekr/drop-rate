import { log } from "mathjs";

export function calculateTrials(dropRate: number, targetRate: number) {
  return Math.ceil(log(1 - targetRate, 1 - dropRate));
}

export function calculateRate(dropRate: number, trials: number) {
  return 1 - Math.pow(1 - dropRate, trials);
}

export function formatPercent(value: number, minimumFractionDigits = 0) {
  return value.toLocaleString(undefined, { style: "percent", minimumFractionDigits });
}

export function formatTrials(value: number) {
  return formatMetricPrefixNumber(value);
}

export function formatMetricPrefixNumber(value: number, digits = 0) {
  const metrics = [
    { value: 1, symbol: "" },
    { value: 1e4, symbol: "만" },
    { value: 1e8, symbol: "억" },
    { value: 1e12, symbol: "조" },
    { value: 1e16, symbol: "경" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = metrics.length - 1; i > 0; i--) {
    if (value >= metrics[i].value) {
      break;
    }
  }
  return (value / metrics[i].value).toFixed(digits).replace(rx, "$1") + metrics[i].symbol;
}
