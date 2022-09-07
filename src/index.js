import Vorpal from "vorpal";
import { calculateOrderTotal, writeFileSync, readAllFiles, buildQuestionArray } from "./lib";

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
        let questions = [];
        for (let i = 1; i <= Number.parseInt(numLemonades); i++) {
          questions = buildQuestionArray(questions, i);
        }
        this.prompt(questions, response => {
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
    let count = 1;
    for (let order of orders) {
      this.log(`ORDER # ${count}`);
      count++;
      this.log(`CUSTOMER: ${order.customer.name}`);
      this.log(`TOTAL: ${order.total}`);
      this.log(`LEMONADES:`);
      this.log(order.lemonades);
      this.log("-+-+-+-+-+-+-+-+");
    }
    callback();
  });

vorpal.delimiter("lemonade-stand$").show();
