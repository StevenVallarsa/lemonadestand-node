import Vorpal from "vorpal";

const vorpal = Vorpal();

vorpal.command("hello <name> [phone]", "Prints hello to console").action(function (args, callback) {
  this.log(`Hello ${args.name}, I'll call you at ${args.phone || "705-524-2486"}`);
  callback();
});

vorpal.command("goodbye", "Prints goodbye to console").action(function (args, callback) {
  this.log("Goodbye World!");
  callback();
});

vorpal.show();

const order = {
  total: 5.0,
  lemonades: [
    {
      lemonJuice: 4,
      water: 2,
      sugar: 3,
      iceCubes: 7,
    },
    {
      lemonJuice: 1,
      water: 5,
      sugar: 2,
      iceCubes: 0,
    },
    {
      lemonJuice: 4.5,
      water: 2.75,
      sugar: 6,
      iceCubes: 10,
    },
  ],
  lemonadeStand: {
    name: "Steve's Lemonade Stand",
  },
  customer: {
    name: "Will",
    phoneNumber: "0000000000",
  },
};
