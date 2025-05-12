// // export const countTotal = (data) => {
// //   return data.reduce((sum, item) => sum + item.sum, 0);
// // };

// // export const dataWithPercentage = (data) => {
// //   const total = countTotal(data);

// //   return data.map((item) => ({
// //     ...item,
// //     percentage: ((item.sum / total) * 100).toFixed(0),
// //   }));
// // };

// export const countTotal = (data) => {
//   return data.reduce((sum, item) => sum + item.sum, 0);
// };

// export const dataWithPercentage = (data) => {
//   // Group by category
//   const grouped = data.reduce((acc, item) => {
//     const category = item.category.categoryName;
//     if (!acc[category]) {
//       acc[category] = { categoryName: category, sum: 0 };
//     }
//     acc[category].sum += item.sum;
//     return acc;
//   }, {});

//   const groupedArray = Object.values(grouped);
//   const total = countTotal(groupedArray);

//   return groupedArray.map((item) => ({
//     ...item,
//     percentage: ((item.sum / total) * 100).toFixed(0),
//   }));
// };
export const countTotal = (data) => {
  return data.reduce((sum, item) => sum + item.sum, 0);
};

export const dataWithPercentage = (data) => {
  const grouped = data.reduce((acc, item) => {
    const category = item.category.categoryName;

    if (!acc[category]) {
      acc[category] = {
        ...item,
        sum: 0,
        category: item.category,
      };
    }

    acc[category].sum += item.sum;

    return acc;
  }, {});

  const groupedArray = Object.values(grouped);
  const total = countTotal(groupedArray);

  return groupedArray.map((item) => ({
    ...item,
    percentage: ((item.sum / total) * 100).toFixed(0),
  }));
};
