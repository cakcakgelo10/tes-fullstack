// Import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import rute
const authRoutes = require('./src/routes/authRoutes'); 
const contentRoutes = require('./src/routes/contentRoutes');

// Inisialisasi aplikasi express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rute dasar untuk tes
app.get('/', (req, res) => {
  res.send('API Server is running...');
});

// Gunakan rute yang sudah di-import
app.use('/api/auth', authRoutes); 
app.use('/api/contents', contentRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});