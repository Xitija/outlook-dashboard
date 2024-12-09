export const graphDataGenerator = (data, feature) => {
  return data.reduce((acc, curr) => {
    if (acc[curr.day]) {
      acc[curr.day] += curr[feature];
    } else {
      acc[curr.day] = curr[feature];
    }
    return acc;
  }, {});
};
