export const DollarsToCents = (v: number): number => {
  return parseInt(Math.round(v * 100).toFixed(0)) || 0;
};
