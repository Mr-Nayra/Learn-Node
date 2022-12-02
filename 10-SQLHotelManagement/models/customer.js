const db = require("../util/database");

module.exports = class Product {
  static deleteById(id) {
    return db.execute("DELETE FROM customer WHERE Customer_id=" + id);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM customer");
  }

  static fetchIds() {
    return db.execute("SELECT Customer_id FROM customer");
  }

  static addCustomer(custId, name, Address, number, age, zip) {
    return db.execute(
      `INSERT INTO customer VALUES (${custId},"${name}","${Address}","${number}",${age},${zip});`
    );
  }

  static fetchById(id) {
    return db.execute("SELECT * FROM customer WHERE Customer_id=" + id);
  }

  static updatesCustomer(custId, name, Address, number, age, zip) {
    return db.execute(
      `UPDATE customer SET Name = "${name}",Address = "${Address}",Contact_No = "${number}",Age = ${age},Zip_code = ${zip} WHERE Customer_id = ${custId};`
    );
  }
};
