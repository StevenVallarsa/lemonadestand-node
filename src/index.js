import Vorpal from "vorpal";
import { calculateOrderTotal, writeFileSync, readAllFiles } from "./lib";

const vorpal = Vorpal();

vorpal
  .command("createOrder <name> <phoneNumber>", "Create an order and save it as a JSON file ")
  .action(function (args, callback) {
    const order = {
      total: 0,
      lemonades: [],
      customer: {
        name: args.name,
        phoneNumber: args.phoneNumber,
      },
      lemonadeStand: {
        name: "Steve's Lemonade",
      },
    };
    this.prompt(
      {
        type: "number",
        name: "numLemonades",
        default: 1,
        message: "How many lemonades do you want to order? ",
      },
      ({ numLemonades }) => {
        const questions = [];
        for (let i = 1; i <= Number.parseInt(numLemonades); i++) {
          questions.push({
            type: "number",
            name: "lemonJuice" + i,
            message: `How much lemon juice for #${i}? `,
          });
          questions.push({
            type: "number",
            name: "water" + i,
            message: `How much water for #${i}? `,
          });
          questions.push({
            type: "number",
            name: "sugar" + i,
            message: `How much sugar for #${i}? `,
          });
          questions.push({
            type: "number",
            name: "iceCubes" + i,
            message: `How many ice cubes for #${i}? `,
          });
        }
        this.prompt(questions, response => {
          e;
          this.log(Number.parseInt(numLemonades));
          // Create lemonade object for each lemonade in order
          for (let i = 1; i <= Number.parseInt(numLemonades); i++) {
            order.lemonades.push({
              lemonJuice: response["lemonJuice" + i],
              water: response["water" + i],
              sugar: response["sugar" + i],
              iceCubes: response["iceCubes" + i],
            });
          }
          // Create price for each lemonade and total of all lemonades
          order.total = calculateOrderTotal(order);
          writeFileSync(order.lemonadeStand.name + "/" + order.customer.name + ".json", order);
          callback();
        });
      }
    );
    callback();
  });

vorpal
  .command("getOrders <lemonadeStand>", "Get all orders for a lemonade stand.")
  .action(function ({ lemonadeStand }, callback) {
    const orders = readAllFiles(lemonadeStand);
    this.log(`There are ${orders.length} lemonade orders`);
    // for (let i = 0; i < orders.length; i++) {
    //   this.log(`Order #${i + 1}`);
    //   this.log(`Price: ${orders[i].total}`);

    //   this.log(`Lemonades: ${orders[i].lemonades}`);
    // }
    let count = 1;
    for (let order of orders) {
      this.log(`ORDER # ${count}`);
      count++;
      this.log(`TOTAL: ${order.total}`);
      this.log(`LEMONADES:`);
      this.log(order.lemonades);
      this.log(`CUSTOMER: ${order.customer.name}`);
      this.log("-+-+-+-+-+-+-+-+");
    }
    callback();
  });

vorpal.delimiter("lemonade-stand$").show();
