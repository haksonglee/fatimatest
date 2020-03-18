var express = require("express");
var router = express.Router();

//var chatUser = require("../model/post")

//read router
router.post("/", function(req, res) {
  console.log("request data ---> ", req.body)
  res.end("")
});

module.exports = router;
