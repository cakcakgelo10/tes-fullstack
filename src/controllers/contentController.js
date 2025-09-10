const db = require('../config/database');

// 1. Membuat Konten Baru (Create)
exports.createContent = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.id; // Diambil dari token JWT setelah lolos middleware

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const [result] = await db.query(
      'INSERT INTO contents (user_id, title, body) VALUES (?, ?, ?)',
      [userId, title, body]
    );

    res.status(201).json({ 
        message: 'Content created successfully', 
        contentId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 2. Mendapatkan Semua Konten (Read with Search & Paginate)
exports.getAllContents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT c.id, c.title, c.body, u.name as author FROM contents c JOIN users u ON c.user_id = u.id';
    let countQuery = 'SELECT COUNT(*) as total FROM contents';
    const params = [];
    
    if (search) {
      query += ' WHERE c.title LIKE ?';
      countQuery += ' WHERE title LIKE ?';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [contents] = await db.query(query, params);
    const [[{ total }]] = await db.query(countQuery, [`%${search}%`]);

    res.json({
      data: contents,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 3. Mendapatkan Konten Berdasarkan ID (Read Detail)
exports.getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [contents] = await db.query(
        'SELECT c.id, c.title, c.body, u.name as author, c.created_at, c.updated_at FROM contents c JOIN users u ON c.user_id = u.id WHERE c.id = ?', 
        [id]
    );

    if (contents.length === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(contents[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 4. Mengupdate Konten (Update)
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      'UPDATE contents SET title = ?, body = ? WHERE id = ? AND user_id = ?',
      [title, body, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Content not found or user not authorized' });
    }

    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 5. Menghapus Konten (Delete)
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [result] = await db.query(
      'DELETE FROM contents WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Content not found or user not authorized' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};