const db = require("../utils/databaseUtil");

class User {
  static async create(name, email, password) {
    return db.execute(
      "INSERT INTO users-table (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
  }

  static async findByEmail(email) {
    return db.execute("SELECT * FROM users-table WHERE email = ?", [email]);
  }
}

module.exports = User;
