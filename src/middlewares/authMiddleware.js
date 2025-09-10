const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Ambil token dari header Authorization
  const authHeader = req.header('Authorization');

  // 2. Cek jika header atau token tidak ada
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.substring(7); // Hapus "Bearer " dari string

  try {
    // 3. Verifikasi token menggunakan secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Simpan payload token (informasi user) ke object request
    req.user = decoded.user;
    
    // 5. Lanjutkan ke controller berikutnya
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;