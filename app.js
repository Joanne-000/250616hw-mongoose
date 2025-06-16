const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Customer = require("./models/Customer");
const prompt = require("prompt-sync")();

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);
  console.log("Connected to MongoDB");

  //   await runQueries(userInput);
};
connect();

const runQueries = async (userInput) => {
  console.log("queries running");

  if (parseInt(userInput) === 1) {
    const newName = prompt("What is the new customers name?");
    const newAge = prompt("What is the new customers age?");

    const customerName = {
      name: newName,
      age: newAge,
    };

    const customer = await Customer.create(customerName);
    console.log("New customer", customer);
  }

  if (parseInt(userInput) === 2) {
    const customers = await Customer.find({});
    console.log("Below is a list of customers:", customers);
  }

  if (parseInt(userInput) === 3) {
    const customers = await Customer.find({});
    console.log("Below is a list of customers:", customers);
    const idUpdate = prompt(
      "Copy and paste the id of the customer you would like to update here:"
    );
    const newName = prompt("What is the customers new name?");
    const newAge = prompt("What is the customers new age?");

    const updatedCustomer = await Customer.findByIdAndUpdate(
      idUpdate,
      { name: newName, age: newAge },
      { new: true }
    );
    console.log("updatedCustomer", updatedCustomer);
  }

  if (parseInt(userInput) === 4) {
    const customers = await Customer.find({});
    console.log("Below is a list of customers:", customers);
    const id = prompt(
      "Copy and paste the id of the customer you would like to delete here:"
    );

    const idDelete = id;
    const removedCustomer = await Customer.findByIdAndDelete(idDelete);
    console.log("Customer removed", removedCustomer);
  }
  if (parseInt(userInput) === 5) {
    console.log("Exiting...");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

    process.exit();
  }
};

const username = prompt("What is your name? ");

console.log(`Your name is ${username}`);

let userInput = 0;

while (parseInt(userInput) !== 5) {
  userInput = prompt(`
Welcome to the CRM
What would you like to do?
  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit

  Number of action to run: 
  `);

  await runQueries(userInput);
}
