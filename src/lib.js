export const calculateLemonadePrice = lemonade => {
  return lemonade.lemonJuice * 0.25 + lemonade.sugar * 0.125 + lemonade.water * 0.01 + lemonade.iceCubes * 0.05;
};

export const calculateOrderTotal = ({ lemonades }) => {
  return lemonades.reduce((a, b) => a + calculateLemonadePrice(b), 0);
};

// TO TEST FUNCTION
// const order = {
//   total: 5.0,
//   lemonades: [
//     {
//       lemonJuice: 4,
//       water: 2,
//       sugar: 3,
//       iceCubes: 7,
//     },
//     {
//       lemonJuice: 1,
//       water: 5,
//       sugar: 2,
//       iceCubes: 0,
//     },
//     {
//       lemonJuice: 4.5,
//       water: 2.75,
//       sugar: 6,
//       iceCubes: 10,
//     },
//   ],
//   lemonadeStand: {
//     name: "Steve's Lemonade Stand",
//   },
//   customer: {
//     name: "Will",
//     phoneNumber: "0000000000",
//   },
// };

// console.log(calculateOrderTotal(order));
