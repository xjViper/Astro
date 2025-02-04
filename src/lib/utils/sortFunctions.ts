// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) =>
      new Date(b.data.date && b.data.date).valueOf() -
      new Date(a.data.date && a.data.date).valueOf(),
  );
  return sortedArray;
};

// sort product by weight
export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter(
    (item: { data: { weight: any } }) => item.data.weight,
  );
  const withoutWeight = array.filter(
    (item: { data: { weight: any } }) => !item.data.weight,
  );
  const sortedWeightedArray = withWeight.sort(
    (a: { data: { weight: number } }, b: { data: { weight: number } }) =>
      a.data.weight - b.data.weight,
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};

// sort craft by rank(S, A, B, C, D, E)
export const sortByRank = (array: any[]) => {
  const rankValues: { [key: string]: number } = {
    S: 0,
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
  };

  const sortedArray = array.sort(
    (a: any, b: any) =>
      (rankValues[b.data.rank.toUpperCase()] || 0) -
      (rankValues[a.data.rank.toUpperCase()] || 0),
  );

  return sortedArray;
};
