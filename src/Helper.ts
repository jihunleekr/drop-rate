import { log } from "mathjs";

export function calculateTrials(dropRate: number, targetRate: number) {
  return Math.ceil(log(1 - targetRate, 1 - dropRate));
}

export function calculateRate(dropRate: number, trials: number) {
  return 1 - Math.pow(1 - dropRate, trials);
}

export function formatPercent(value: number) {
  return value.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 1 });
}
