const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rute untuk registrasi pengguna baru
// Endpoint: POST /api/auth/register
router.post('/register', authController.register);

// Rute untuk login pengguna
// Endpoint: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;