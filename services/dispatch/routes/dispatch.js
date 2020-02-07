const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dispatchController = require("../controller/dispatchController");
const safeJsonStringify = require("safe-json-stringify");
const asyncLoop = require("node-async-loop");
const locationController = require("../controller/locationController");

router.post("/", (req, res) => {
  res.json({ msg: "Welcome to API" });
});

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to API from get" });
});

router.post(
  "/dispatch",
  /* verifyToken, */ async (req, res) => {
    const dataFromController = await dispatchController.createDispatch(
      req,
      res
    );
    //res.json(safeJsonStringify(dataFromController));
  }
);

router.post(
  "/dispatch/getDispatchDetails",
  /* verifyToken, */ async (req, res) => {
    //console.log("received", req.body);
    const vehicleNo = req.body.vehicleNo;
    console.log("coming");
    console.log(req.body);

    if (vehicleNo) {
      const data = await dispatchController.getDispatchDetails(vehicleNo);

      console.log(data);
      if (data) {
        return res.json({
          status: 200,
          result: data
        });
      } else {
        return res.json({
          status: 204,
          result: "Something went wrong"
        });
      }
    } else {
      return res.json({
        status: 204,
        result: "No Vehicle No has been sent"
      });
    }
    //await dispatchController.getDispatch
  }
);

router.get("/dispatch", async (req, res) => {
  let getAllDispatchesDataArray = await dispatchController.getAllDispatch(
    req,
    res
  );

  //return res.json({ msg: getAllDispatchesDataArray });

  let ArrTemp = [];
  let temp = [];
  let resultDataArray = [];
  let tripId = null;

  try {
    const response = await Promise.all(
      getAllDispatchesDataArray.map(async (item, index) => {
        let resultDataArray = {};

        if (item.tripId) {
          resultDataArray.tripId = item.tripId;
          //sourceName;
        }
        if (item.vehicleNo) {
          resultDataArray.vehicleNo = item.vehicleNo;
          //sourceName;
        }
        tripId = item.tripId;

        if (item.sourceId) {
          resultDataArray.sourceName = await dispatchController.getSourceName(
            item.sourceId,
            item.tripId
          ); //sourceName;
        }

        if (item.destinationId) {
          resultDataArray.destinationName = await dispatchController.getSourceName(
            item.destinationId,
            item.tripId
          );
        }

        if (item.transporterMasterId) {
          resultDataArray.transporterName = await dispatchController.getTransporterName(
            item.transporterMasterId,
            item.tripId
          );
        }

        if (item.driverMasterId) {
          resultDataArray.driverName = await dispatchController.getDriverName(
            item.driverMasterId,
            item.tripId
          );
        }

        if (item.routeMasterId) {
          resultDataArray.routeName = await dispatchController.getRouteName(
            item.routeMasterId,
            item.tripId
          );
        }

        if (item.tripStatusMasterId) {
          resultDataArray.tripStatus = await dispatchController.getTripStatusName(
            item.tripStatusMasterId,
            item.tripId
          );
        }
        if (item.SkuMasterId) {
          resultDataArray.skuCode = await dispatchController.getSkuCode(
            item.SkuMasterId,
            item.tripId
          );
        }

        if (item.vehicleTypeMasterId) {
          resultDataArray.vehicleType = await dispatchController.getVehicleTypeByName(
            item.vehicleTypeMasterId,
            item.tripId
          );
        }
        if (item.driverMasterId) {
          resultDataArray.driverMobileNo = await dispatchController.getDriverNumber(
            item.driverMasterId,
            item.tripId
          );
        }

        if (item.destinationId) {
          resultDataArray.latLong = await dispatchController.getLatLong(
            item.destinationId,
            item.tripId
          );
        }

        const address = locationController.getLocationbyLatLong(
          "18.15699959",
          "73.29570007"
        );
        // // //console.log("-------------------", address);
        resultDataArray.currentLocation = await locationController.getLocationfromGoogle(
          address
        );

        ArrTemp.push(resultDataArray);
      })
    );

    return res.json({
      status: 200,
      result: ArrTemp
    });
  } catch (e) {
    return res.json({
      msg: e
    });
  }

  /* Promises testing ends here */
});

router.get("/dispatch/:id", async (req, res) => {
  //dispatchController.getDispatchById(req,res);
  return res.json({
    message: "I am in GET with specific id"
  });
});

router.put("/dispatch/:id", async (req, res) => {
  return res.json({
    message: "I am in PUT"
  });
});

router.delete("/dispatch/:id", async (req, res) => {
  return res.json({
    message: "I am in DELETE"
  });
});

module.exports = router;
