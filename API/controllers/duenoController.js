const pool = require('../config/db')

// Obtener todos los dueños
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM dueno')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener dueños' })
  }
}

// Obtener un dueño por ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM dueno WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Dueño no encontrado' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el dueño' })
  }
}

// Crear un nuevo dueño
exports.create = async (req, res) => {
  const { nombre_completo, rut, telefono, correo } = req.body
  if (!nombre_completo || !rut || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    await pool.query(
      'INSERT INTO dueno (nombre_completo, rut, telefono, correo) VALUES (?, ?, ?, ?)',
      [nombre_completo, rut, telefono, correo]
    )
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear dueño' })
  }
}

// Actualizar un dueño
exports.update = async (req, res) => {
  const { nombre_completo, rut, telefono, correo } = req.body
  try {
    await pool.query(
      'UPDATE dueno SET nombre_completo=?, rut=?, telefono=?, correo=? WHERE id=?',
      [nombre_completo, rut, telefono, correo, req.params.id]
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar dueño' })
  }
}

// Eliminar un dueño
exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM dueno WHERE id = ?', [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar dueño' })
  }
}
