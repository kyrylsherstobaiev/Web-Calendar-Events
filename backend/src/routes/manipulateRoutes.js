const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/crud-controller");
const {
  registerUser,
  loginUser,
  signOutUser,
  getUser,
} = require("../controllers/auth-controller");

router.post("/", getEvents);

router.post("/user/:uid", getUser);

router.post("/newevent", createEvent);

router.patch("/edit", updateEvent);

router.delete("/delete", deleteEvent);

router.post("/signup", registerUser);

router.post("/signin", loginUser);

router.post("/signout", signOutUser);

module.exports = router;
