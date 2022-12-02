const Services = require("../models/services");

exports.getServices = (req, res, next) => {
  Services.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("services/index", {
        services: rows,
      });
    })
    .catch((err) => console.log(err));
};

exports.addService = (req, res, next) => {
  res.render("services/add-service");
};

exports.addsService = (req, res, next) => {
  const serviceId = req.body.Service_id;
  const name = req.body.name;
  const charge = req.body.charge;

  Services.addService(serviceId, name, charge);
  res.redirect("/services");
};

exports.updateService = (req, res, next) => {
  const Service_id = req.query.Service_id;
  const Service_name = req.query.Service_name;
  const Sevice_charge = req.query.Sevice_charge;

  res.render("services/update-service", {
    Service_id: Service_id,
    Service_name: Service_name,
    Sevice_charge: Sevice_charge,
  });
};

exports.updatesService = (req, res, next) => {
  const serviceId = req.body.Service_id;
  const name = req.body.name;
  const charge = req.body.charge;

  Services.updateService(serviceId, name, charge);

  res.redirect("/services");
};

exports.deleteService = (req, res, next) => {
  const serId = req.body.serviceId;
  Services.deleteById(serId);
  res.redirect("/services");
};
