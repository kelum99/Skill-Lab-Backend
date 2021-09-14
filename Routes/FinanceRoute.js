const router = require("express").Router();
const Wallet = require("../Models/Wallet");

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

router.get("/wallet/:id", async (req, res) => {
  try {
    const findById = await Wallet.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/wallet/find/:name", async (req, res) => {
  try {
    const findByName = await Wallet.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/wallet/findAll/:name", async (req, res) => {
  try {
    const findAll = await Wallet.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

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



module.exports = router;
