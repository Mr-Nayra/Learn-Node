const Customer = require("../models/customer");

exports.getIndex = (req, res, next) => {
  Customer.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("customer/index", {
        customers: rows,
      });
    })
    .catch((err) => console.log(err));
};

exports.addCustomer = (req, res, next) => {
  res.render("customer/add-customer");
};

exports.addsCustomer = (req, res, next) => {
  const custId = req.body.Customer_id;
  const name = req.body.name;
  const Address = req.body.Address;
  const number = req.body.phone_number;
  const age = req.body.age;
  const zip = req.body.zip_code;
  Customer.addCustomer(custId, name, Address, number, age, zip);
  res.redirect("/");
};

exports.updatesCustomer = (req, res, next) => {
  const custId = req.body.Customer_id;
  const name = req.body.name;
  const Address = req.body.Address;
  const number = req.body.phone_number;
  const age = req.body.age;
  const zip = req.body.zip_code;
  Customer.updatesCustomer(custId, name, Address, number, age, zip);
  res.redirect("/");
};

exports.updateCustomer = (req, res, next) => {
  const custId = req.query.Customer_id;
  const name = req.query.Name;
  const Address = req.query.Address;
  const number = req.query.number;
  const age = req.query.Age;
  const zip = req.query.Zip_code;

  res.render("customer/edit-customer", {
    Customer_id: custId,
    Name: name,
    Address: Address,
    Contact_No: number,
    Age: age,
    Zip_code: zip,
  });
};

exports.deleteCustomer = (req, res, next) => {
  const custId = req.body.customerId;
  Customer.deleteById(custId);
  res.redirect("/");
};
