const Reservation = require("../models/reservation");
const Customer = require("../models/customer");
const Services = require("../models/services");

var moment = require("moment");

exports.showReservations = (req, res, next) => {
  Reservation.fetchAll()
    .then(([rows, fieldData]) => {
      for (let i = 0; i < rows.length; i++) {
        rows[i].Check_in_date = moment(rows[i].Check_in_date)
          .utc()
          .format("DD/MM/YYYY");
        rows[i].Check_out_date = moment(rows[i].Check_out_date)
          .utc()
          .format("DD/MM/YYYY");
      }
      res.render("reservations/index", {
        reservations: rows,
      });
    })
    .catch((err) => console.log(err));
};

exports.noroom = (req, res, next) => {
  res.render("reservations/room-not-avaliable");
};

exports.billDetails = (req, res, next) => {
  Reservation.fetchBillData(req.query.reservation_no).then(
    ([row, fieldData]) => {
      res.render("reservations/bill_details", {
        billdata: row,
        name: req.query.name,
      });
    }
  );
};

exports.addReservation = (req, res, next) => {
  var date = new Date();

  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  var formattedDate = day + "-" + month + "-" + year;

  Customer.fetchIds().then(([custIds, fieldData]) => {
    Services.fetchIds().then(([SerIds, fieldData]) => {
      res.render("reservations/add-reservation", {
        customers: custIds,
        Services: SerIds,
        date: formattedDate,
      });
    });
  });
};

exports.addsReservation = (req, res, next) => {
  const custId = req.body.Customer_id;
  const ServiceId = req.body.Service_id;
  const Check_in = req.body.Check_in;
  const Check_out = req.body.Check_out;
  const status = req.body.status;
  const reserve = req.body.Reservation_no;
  const room = req.body.room;

  Reservation.checkRoom(room, Check_in, Check_out).then((a, b) => {
    if (a[0][0].ans) {
      Reservation.addReservation(
        reserve,
        custId,
        ServiceId,
        room,
        Check_in,
        Check_out,
        status
      );
      res.redirect("/reservations");
    } else {
      res.redirect("/reservations/room-not-avaliable");
    }
  });
};
