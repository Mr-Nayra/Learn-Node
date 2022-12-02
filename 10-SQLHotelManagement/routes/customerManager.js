const path = require("path");

const express = require("express");

const customerController = require("../controllers/customer");

const serviceController = require("../controllers/services");

const reservationController = require("../controllers/reservation");

const router = express.Router();

router.get("/", customerController.getIndex);

router.get("/add-customer", customerController.addCustomer);

router.post("/delete-customer", customerController.deleteCustomer);

router.get("/update-customer", customerController.updateCustomer);

router.post("/admin/add-customer", customerController.addsCustomer);

router.post("/admin/update-customer", customerController.updatesCustomer);

router.get("/services", serviceController.getServices);

router.get("/services/add-service", serviceController.addService);

router.post("/admin/add-service", serviceController.addsService);

// router.post("/delete-service", serviceController.deleteService);

router.get("/update-service", serviceController.updateService);

router.post("/admin/update-service", serviceController.updatesService);

router.get("/reservations", reservationController.showReservations);

router.get(
  "/reservations/add-reservation",
  reservationController.addReservation
);

router.get("/reservations/bill-details", reservationController.billDetails);

router.post("/admin/add-reservation", reservationController.addsReservation);

router.get("/reservations/room-not-avaliable", reservationController.noroom);

module.exports = router;
