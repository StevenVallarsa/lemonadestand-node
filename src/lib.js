import fs from "fs";

export const calculateLemonadePrice = lemonade => {
  const cost =
    lemonade.lemonJuice * 0.25 + lemonade.sugar * 0.125 + lemonade.water * 0.01 + lemonade.iceCubes * 0.05 + 0.5;
  lemonade.price = cost;
  return cost;
};

export const calculateOrderTotal = ({ lemonades }) => {
  return lemonades.reduce((a, b) => a + calculateLemonadePrice(b), 0);
};

export const writeFileSync = (fileName, order) => {
  fs.writeFileSync(fileName, JSON.stringify(order));
};

export const readAllFiles = dirName => {
  const orders = [];
  for (let name of fs.readdirSync(dirName)) {
    orders.push(JSON.parse(fs.readFileSync(dirName + "/" + name)));
  }
  return orders;
};

export const buildQuestionArray = (originalArray, i) => [
  ...originalArray,
  {
    type: "number",
    name: "lemonJuice" + i,
    message: `How much lemon juice for #${i}? `,
  },
  {
    type: "number",
    name: "water" + i,
    message: `How much water for #${i}? `,
  },
  {
    type: "number",
    name: "sugar" + i,
    message: `How much sugar for #${i}? `,
  },
  {
    type: "number",
    name: "iceCubes" + i,
    message: `How many ice cubes for #${i}? `,
  },
];

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
