const mysql = require('mysql2/promise');
require('dotenv').config();

// Buat pool koneksi agar lebih efisien
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tes koneksi saat aplikasi dimulai
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release(); // Kembalikan koneksi ke pool
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  });

module.exports = pool;