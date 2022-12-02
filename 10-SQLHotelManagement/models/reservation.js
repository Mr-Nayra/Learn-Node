const db = require("../util/database");

module.exports = class Product {
  static fetchAll() {
    return db.execute(
      "SELECT C.Customer_id, C.Name, R.reservation_no, R.Check_in_date, R.Check_out_date, Service_name, R.Service_id, R.room_id FROM customer as C, reservation as R, services as S WHERE C.Customer_id = R.Customer_id AND S.Service_id = R.Service_id"
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM reservation WHERE reservation_no=" + id);
  }

  static fetchBillData(reserveno) {
    return db.execute(
      `SELECT * FROM bill_details WHERE reservation_no = ${reserveno};`
    );
  }

  static addReservation(reserveno, custId, serID, rmID, StDate, EndDate, Status) {
    return db.execute(
      `INSERT INTO reservation VALUES (${reserveno},${custId},${serID},${rmID},'${StDate}','${EndDate}',"${Status}");`
    );
  }

  static checkRoom(room, Check_in, Check_out) {
    return db.execute(
      `SELECT GetEmptyRooms(${room},'${Check_in}','${Check_out}') as ans`
    );
  }
};
