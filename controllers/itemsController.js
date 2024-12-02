 
const db = require('../models/db');

// GET all items
exports.getAllItems = (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.render('index', { items: rows });
    });
};

// POST a new item
exports.createItem = (req, res) => {
    const { name, description } = req.body;
    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};

// PUT (update) an item
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};

// PATCH (partial update) an item
exports.partialUpdateItem = (req, res) => {
    const { id } = req.params;
    const updates = Object.keys(req.body).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(req.body), id];
    db.run(`UPDATE items SET ${updates} WHERE id = ?`, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};

// DELETE an item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};
