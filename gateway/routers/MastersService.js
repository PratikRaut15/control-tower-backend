const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/config");
const dbservices = require("../services/dbServices");
const apiAdapter = require("./apiAdapter");
let BASE_URL = "http://localhost:5002/api/masters";
let api = apiAdapter(BASE_URL);

router.get("/", (req, res) => {
  console.log("Masters");
  return res.json({ msg: "coming" });
});

router.post("/", (req, res) => {
  console.log("Masters");
  return res.json({ msg: "Welcome from Post" });
});

router.get(
  "/:hashtag",
  /* isAuthorized, */ (req, res) => {
    console.log("I am here in get....",BASE_URL);
    api.get(req.path,req.body).then(resp => {
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);

router.post(
  "/:hashtag",
  /* isAuthorized, */ (req, res) => {
    console.log("I am here in get....",BASE_URL);
    api.get(req.path,req.body).then(resp => {
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);

router.get("", (req, res) => {
  console.log("Masters");
  return res.json({ msg: "coming2" });
});

module.exports = router;
