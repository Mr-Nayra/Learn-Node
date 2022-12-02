const db = require("../util/database");

module.exports = class Product {
  static deleteById(id) {
    return db.execute("DELETE FROM services WHERE Service_id=" + id);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM services");
  }
  fetchIds;

  static fetchIds() {
    return db.execute("SELECT Service_id FROM services");
  }

  static updateService(serviceId, name, charge) {
    return db.execute(
      `UPDATE services SET Service_name = "${name}", Sevice_charge = ${charge} WHERE Service_id = ${serviceId};`
    );
  }

  static addService(serviceId, name, charge) {
    return db.execute(
      `INSERT INTO services VALUES (${serviceId},"${name}",${charge});`
    );
  }

  static findById(id) {}
};
