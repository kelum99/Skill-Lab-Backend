const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECT, err => {
  if (err) {
    console.log("mongo connection error ", err);
  } else {
    console.log("Mongodb connection success");
  }
});

const routWallet = require("./Routes/FinanceRoute");
app.use("/api/finance", routWallet);

const routeProduct = require("./Routes/StoreRoute");
app.use("/api/store", routeProduct);

const routeCart = require("./Routes/StoreRoute");
app.use("/api/store", routeCart);

app.listen(4000, err => {
  if (!err) {
    console.log("successfully connected to the port ", 4000);
  } else {
    console.log("error occured ", err);
  }
});

