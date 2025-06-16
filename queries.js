// const express = require("express");
// const app = express();

// app.use(express.json());

// app.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });

// app.get("/", (req, res) => {
//   res.send(`<h1>Hello there! </h1>`);
// });

// app.get("/:username", (req, res) => {
//   res.send(`<h1>Hello there, Your name is ${req.params.username}!</h1>`);
// });

// app.get("/customers", async (req, res) => {
//   const customers = await Customer.find({});
//   res.json(customers);
//   console.log("customers", customers);
// });

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Customer = require("./models/Customer");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);
  console.log("Connected to MongoDB");

  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  process.exit();
};

const runQueries = async () => {
  console.log("queries running");

  const customerName = {
    name: "Jessica",
    age: 16,
  };

  const customer = await Customer.create(customerName);
  console.log("customer", customer);

  const idUpdate = "68501d192465337396cd0b64";
  const updatedCustomer = await Customer.findByIdAndUpdate(
    idUpdate,
    { name: "Cassandra", age: 28 },
    { new: true }
  );
  console.log("updatedCustomer", updatedCustomer);

  const idDelete = "685022815de6fa5e2d4ba6fb";
  const removedCustomer = await Customer.findByIdAndDelete(idDelete);
  console.log("removedCustomer", removedCustomer);
};

// connect();
