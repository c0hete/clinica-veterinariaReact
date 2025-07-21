const pool = require('../config/db')

// Obtener todos los veterinarios
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM veterinario')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener veterinarios' })
  }
}

// Obtener un veterinario por ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM veterinario WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Veterinario no encontrado' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener veterinario' })
  }
}

// Crear veterinario
exports.create = async (req, res) => {
  const { nombre_completo, especialidad, telefono } = req.body
  if (!nombre_completo || !especialidad || !telefono) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    await pool.query(
      'INSERT INTO veterinario (nombre_completo, especialidad, telefono) VALUES (?, ?, ?)',
      [nombre_completo, especialidad, telefono]
    )
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear veterinario' })
  }
}

// Actualizar veterinario
exports.update = async (req, res) => {
  const { nombre_completo, especialidad, telefono } = req.body
  try {
    await pool.query(
      'UPDATE veterinario SET nombre_completo=?, especialidad=?, telefono=? WHERE id=?',
      [nombre_completo, especialidad, telefono, req.params.id]
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar veterinario' })
  }
}

// Eliminar veterinario
exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM veterinario WHERE id = ?', [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar veterinario' })
  }
}
