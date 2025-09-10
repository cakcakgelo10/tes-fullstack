const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middlewares/authMiddleware');

// === Rute yang Dilindungi (Memerlukan Login) ===

// POST /api/contents -> Membuat konten baru
router.post('/', authMiddleware, contentController.createContent);

// PUT /api/contents/:id -> Mengupdate konten berdasarkan ID
router.put('/:id', authMiddleware, contentController.updateContent);

// DELETE /api/contents/:id -> Menghapus konten berdasarkan ID
router.delete('/:id', authMiddleware, contentController.deleteContent);


// === Rute Publik (Tidak Perlu Login) ===

// GET /api/contents -> Mendapatkan semua konten dengan search dan pagination
router.get('/', contentController.getAllContents);

// GET /api/contents/:id -> Mendapatkan detail konten berdasarkan ID
router.get('/:id', contentController.getContentById);


module.exports = router;