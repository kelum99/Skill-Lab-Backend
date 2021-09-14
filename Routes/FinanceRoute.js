const router = require("express").Router();
const Wallet = require("../Models/Wallet");
const Bank = require("../Models/Bank");
const PaymentHistory = require("../Models/PaymentHistory");
const WithdrawHistory= require("../Models/WithdrawHistory");


//Wallet Routing
//Insert
router.post("/wallet", async (req, res) => {
  try {
    const wallet = new Wallet(req.body);
    const savedWallet = await wallet.save();
    if (savedWallet) {
      res.status(201).send({ message: "success", data: savedWallet });
    } else {
      res.status(400).send({ message: "failed", data: savedWallet });
    }
    console.log("result , ", savedWallet);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Find All
router.get("/wallet", async (_, res) => {
  res.json(await Wallet.find({}));
});

//Find by ID
router.get("/wallet/:id", async (req, res) => {
  try {
    const findById = await Wallet.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Fnd one by Specific Parameter
router.get("/wallet/find/:name", async (req, res) => {
  try {
    const findByName = await Wallet.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Find All by Specific Parameter
router.get("/wallet/findAll/:name", async (req, res) => {
  try {
    const findAll = await Wallet.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Delet
router.delete("/wallet/:id", async (req, res) => {
  try {
    const deleteWallet = await Wallet.deleteOne(req.params);
    res.json(deleteWallet);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Update
router.put("/wallet/update/:id", async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const result = await Wallet.updateOne(
        { _id: req.params.id },
        { ...data }
      );
      console.log("Success ", result);
      res.status(201).send({ message: "success", data: result });
    } else {
      res.status(204).send({ message: "update data can not be empty!" });
    }
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Bank Routing
//Insert
router.post("/bank", async (req, res) => {
  try {
    const bank = new Bank(req.body);
    const savedBank = await bank.save();
    if (savedBank) {
      res.status(201).send({ message: "success", data: savedBank });
    } else {
      res.status(400).send({ message: "failed", data: savedBank });
    }
    console.log("result , ", savedBank);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Find All
router.get("/bank", async (_, res) => {
  res.json(await Bank.find({}));
});

//Find by ID
router.get("/bank/:id", async (req, res) => {
  try {
    const findById = await Bank.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Fnd one by Specific Parameter
router.get("/bank/find/:name", async (req, res) => {
  try {
    const findByName = await Bank.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Find All by Specific Parameter
router.get("/bank/findAll/:name", async (req, res) => {
  try {
    const findAll = await Bank.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Update
router.put("/bank/update/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;

    if (data) {
      const result = await Bank.updateOne(
        { _id: id},
        { ...data }
      );
      console.log("Success ", result);
      res.status(201).send({ message: "success", data: result });
    } else {
      res.status(204).send({ message: "update data can not be empty!" });
    }
  
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//delete
router.delete("/bank/:id", async (req, res) => {
  try {
    const deleteBank = await Bank.deleteOne(req.params);
    res.json(deleteBank);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Payment History
router.post("/paymentHistory", async (req, res) => {
  try {
    const paymentHistory = new PaymentHistory(req.body);
    const savedPHistory = await paymentHistory.save();
    if (savedPHistory) {
      res.status(201).send({ message: "success", data: savedPHistory });
    } else {
      res.status(400).send({ message: "failed", data: savedPHistory });
    }
    console.log("result , ", savedPHistory);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Withdraw History
router.post("/withdrawHistory", async (req, res) => {
  try {
    const withdrawHistory = new WithdrawHistory(req.body);
    const savedWHistory = await withdrawHistory.save();
    if (savedWHistory) {
      res.status(201).send({ message: "success", data: savedWHistory });
    } else {
      res.status(400).send({ message: "failed", data: savedWHistory });
    }
    console.log("result , ", savedWHistory);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});
module.exports = router;
