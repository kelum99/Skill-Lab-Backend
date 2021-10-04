const router = require("express").Router();
const Contact = require("../Models/Contact");
const Review = require("../Models/Review");
const extractToken = require("../TokenExtract");
const jwt_decode = require('jwt-decode');





/*Insert review form details */
router.post("/review", async (req, res) => {
  try {
    const decodeHead = jwt_decode(extractToken(req));
    const userID = decodeHead.data._id;
    console.log("header",decodeHead);
    console.log("ID : ", userID);
    const review = new Review({
      stid: req.body.stid,
      fname: req.body.fname,
      course: req.body.course,
      rate: req.body.rate,
      comment:req.body.comment,
      userID: userID
    });
    const savedReview = await review.save();
    if (savedReview) {
      res.status(201).send({ message: "success", data: savedReview});
    } else {
      res.status(400).send({ message: "failed", data: savedReview });
    }
    console.log("result , ", savedReview);
  } catch (err) {
    console.log("error in review details ", err);
    res.status(500).send({ message: "failed", data: err });

  }

});

/*Add contact form details */
router.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    if (savedContact) {
      res.status(201).send({ message: "success", data: savedContact });
    } else {
      res.status(400).send({ message: "failed", data: savedContact });
    }
    console.log("result , ",savedContact);
  } catch (err) {
    console.log("error in contact details ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

/*Retreive  review details for lecturer */
router.get("/review/findAll", async (req, res) => {
  try {
    const findAll = await Review.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

// // Retreive own review details for student
// router.get("/review/findAll/:stid", async (req, res) => {
//   try {
//     const findAll = await Review.find(req.params);
//     res.json(findAll);
//   } catch (err) {
//     console.log("error in geting review details", err);
//     res.status(204).send({ message: "failed", data: err });
//   }
// });


//Find All reviews by UserID
router.get("/review/findAll/:userID", async (req, res) => {
  try {
    const findAll = await Review.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in geting review details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});


//Get specific review
router.get("/review/:id", async (req, res) => {
  try {
      const review = await Review.findById(req.params.id);
      res.json(review);
      console.log("result , ", review);
  } catch (err) {
      console.log("error in getting marks", err);
      res.status(204).send({ message: "failed", data: err });
  }
});

/*Edit reviews */
router.put("/review/:id", async (req, res) => {
  try {
    const UpdateReview = await Review.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(UpdateReview);
    console.log("result, ", UpdateReview);
  } catch (err) {
    console.log("error in getting review details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

/*delete specific review */
router.delete("/review/:id", async (req, res) => {
  try {
    const deleteReview = await Review.findByIdAndRemove(req.params.id);
    res.json(deleteReview);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

/*Retreive coustomer issue details for admin */
router.get("/contact/findAll", async (req, res) => {
  try {
    const findAll = await Contact.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

/*delete specific issue */
router.delete("/contact/:id", async (req, res) => {
  try {
    const deleteContact= await Contact.findByIdAndRemove(req.params.id);
    res.json(deleteContact);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

module.exports = router;