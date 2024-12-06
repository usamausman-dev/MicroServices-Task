const sqlite3 = require('sqlite3').verbose();
const dbName = 'orders.db'

let db = new sqlite3.Database(dbName, (err) => {

  if (err) {
    console.err(err.message)
  }

  else {
    console.log("Database Connected")
    db.run('CREATE TABLE IF NOT EXISTS Orders (OrderID INTEGER PRIMARY KEY AUTOINCREMENT,UserID INTEGER NOT NULL, ProductID INTEGER NOT NULL,Quantity INTEGER NOT NULL,Status TEXT NOT NULL)',
      (err) => {
        if (err) {
          console.error(err.message)
        }

        else {
          console.log("Table Created/Existed")
        }

      })
  }

})

const createOrder = (userId, productId, quantity, status) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Orders (UserID, ProductID, Quantity, Status) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, productId, quantity, status], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

// Get orders by user
const getOrdersByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Orders WHERE UserID = ?`;
    db.all(query, [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const updateOrderStatus = (orderId, status) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Orders SET Status = ? WHERE OrderID = ?`;
    db.run(query, [status, orderId], function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0); // `this.changes` indicates if rows were updated
    });
  });
};

module.exports = { createOrder, getOrdersByUser, updateOrderStatus };
