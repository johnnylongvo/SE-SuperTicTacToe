import * as express from "express";

const router = express.Router();

// this gets the home page
router.get("/", function (req, res, next) {
  res.send("Tic Tac Toe Game!!");
});

module.exports = router;
