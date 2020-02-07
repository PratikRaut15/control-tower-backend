var express = require("express");
var router = express.Router();
const apiAdapter = require("./apiAdapter");
const isAuthorized = require("../controller/requestAuthenticator");

/* const BASE_URL = 'http://localhost:8000' */
//let BASE_URL = "http://localhost:5001/dispatchApi/dispatch";
// as of now port no is in use that's why changing the port no
let BASE_URL = "http://localhost:6001/dispatchApi/dispatch";
let api = apiAdapter(BASE_URL);

router.get(
  "/",
  /* isAuthorized,  */ (req, res) => {
    console.log("I am here in get....",BASE_URL);
    api.get(req.path).then(resp => {
      console.log(resp);
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);

router.post(
  "/",
  /* isAuthorized, */ (req, res) => {
    console.log("I am here in get....",BASE_URL);
    api.post(req.path,req.body).then(resp => {
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);

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
    console.log("I am here in post....",req);
    api.post(req.path,req.body).then(resp => {
      console.log(resp);
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);

router.delete(
  "/",
  /* isAuthorized, */ (req, res) => {
    console.log("I am here in delete....");
    api.delete(req.path, req.body).then(resp => {
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);

router.delete(
  "/feeds",
  /*  isAuthorized, */ (req, res) => {
    api.get(req.path).then(resp => {
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);

router.post(
  "/",
  /*  isAuthorized, */ (req, res) => {
    api.post(req.path).then(resp => {
      res.send(resp.data);
    }).catch(err => console.log(err));
  }
);
module.exports = router;
