export const getChartItemColor = (value: number) => {
  if (value > 85) return '#ff2e2e';
  if (value > 60) return '#ffa500';
  return '#34c7cf';
};

export const getTempColor = (value: number) => {
  if (value > 85) return '#ff2e2e';
  if (value > 60) return '#ffa500';
  return '#34c7cf';
};
