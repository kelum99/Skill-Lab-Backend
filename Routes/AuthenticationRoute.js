const router = require("express").Router();
const LecturerSignup = require("../Models/LecturerSignup");
const StudentSignup = require("../Models/StudentSignup");
const jwt = require("jsonwebtoken");

//Student

router.post("/StudentSignup", async (req, res) => {
  try {
    const studentSignup = new StudentSignup(req.body);
    const savedStudentSignup = await studentSignup.save();
    if (savedStudentSignup) {
      res.status(201).send({ message: "success", data: savedStudentSignup });
    } else {
      res.status(400).send({ message: "failed", data: savedStudentSignup });
    }
    console.log("result , ", savedStudentSignup);
  } catch (err) {
    console.log("error in StudentSignup ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

router.get("/StudentSignup/:id", async (req, res) => {
  try {
    const findById = await StudentSignup.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/StudentSignup/find/:name", async (req, res) => {
  try {
    const findByName = await StudentSignup.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/StudentSignup", async (_, res) => {
  res.json(await StudentSignup.find({}));
});

router.put("StudentSignup/update/:id", async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const result = await StudentSignup.updateOne(
        { _id: req.params.id },
        { ...data }
      );
      console.log("Success", result);
      res.status(201).send({ message: "success", data: result });
    } else {
      res.status(204).send({ message: "update data can not be empty!" });
    }
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.delete("/StudentSignup/:id", async (req, res) => {
  try {
    const deleteStudentSignup = await StudentSignup.findByIdAndDelete(
      req.params.id
    );
    res.json(deleteStudentSignup);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Lecturer

router.post("/LecturerSignup", async (req, res) => {
  try {
    const lecturerSignup = new LecturerSignup(req.body);
    const savedLecturerSignup = await lecturerSignup.save();
    if (savedLecturerSignup) {
      res.status(201).send({ message: "success", data: savedLecturerSignup });
    } else {
      res.status(400).send({ message: "failed", data: savedLecturerSignup });
    }
    console.log("result , ", savedLecturerSignup);
  } catch (err) {
    console.log("error in LecturerSignup ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

router.get("/LecturerSignup/:id", async (req, res) => {
  try {
    const findById = await LecturerSignup.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/LecturerSignup/find/:name", async (req, res) => {
  try {
    const findByName = await LecturerSignup.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/LecturerSignup", async (_, res) => {
  res.json(await LecturerSignup.find({}));
});

router.delete("/LecturerSignup/:id", async (req, res) => {
  try {
    const deleteLecturerSignup = await LecturerSignup.findByIdAndDelete(
      req.params.id
    );
    res.json(deleteLecturerSignup);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await StudentSignup.findOne({
      $and: [{ email }, { inputpw: password }]
    });
    if (result) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            _id: result._id,
            email: result.email,
            nic: result.nic,
            role: result.role
          }
        },
        "secret"
      );
      res
        .status(200)
        .send({
          message: "success",
          data: {
            token,
            _id: result._id,
            email: result.email,
            nic: result.nic,
            role: result.role
          }
        });
    } else {
      res.status(401).send({ message: "Check email or password" });
    }
    console.log("login succes ", result);
  } catch (err) {
    console.log("login requsee eror ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});
module.exports = router;
