const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Fungsi untuk Registrasi Pengguna
exports.register = async (req, res) => {
  try {
    // 1. Ambil data dari body request
    const { name, email, password } = req.body;

    // 2. Validasi input sederhana
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // 3. Cek apakah email sudah terdaftar
    const [userExists] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (userExists.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // 4. Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Simpan user baru ke database
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    // 6. Kirim respons sukses
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fungsi untuk Login Pengguna
exports.login = async (req, res) => {
  try {
    // 1. Ambil email dan password dari body
    const { email, password } = req.body;

    // 2. Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 3. Cari user berdasarkan email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Unauthorized
    }
    const user = users[0];

    // 4. Bandingkan password yang diinput dengan yang ada di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 5. Jika cocok, buat JWT Token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );
    
    // 6. Kirim token ke client
    res.json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};