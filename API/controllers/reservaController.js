const pool = require('../config/db')

// Obtener todas las reservas
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reserva_procedimiento')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reservas' })
  }
}

// Obtener una reserva por ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reserva_procedimiento WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reserva' })
  }
}

// Crear una reserva
exports.create = async (req, res) => {
  const { id_mascota, id_veterinario, tipo_procedimiento, fecha, hora } = req.body
  if (!id_mascota || !id_veterinario || !tipo_procedimiento || !fecha || !hora) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    await pool.query(
      'INSERT INTO reserva_procedimiento (id_mascota, id_veterinario, tipo_procedimiento, fecha, hora) VALUES (?, ?, ?, ?, ?)',
      [id_mascota, id_veterinario, tipo_procedimiento, fecha, hora]
    )
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reserva' })
  }
}

// Actualizar reserva
exports.update = async (req, res) => {
  const { id_mascota, id_veterinario, tipo_procedimiento, fecha, hora } = req.body
  try {
    await pool.query(
      'UPDATE reserva_procedimiento SET id_mascota=?, id_veterinario=?, tipo_procedimiento=?, fecha=?, hora=? WHERE id=?',
      [id_mascota, id_veterinario, tipo_procedimiento, fecha, hora, req.params.id]
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar reserva' })
  }
}

// Eliminar reserva
exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM reserva_procedimiento WHERE id = ?', [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar reserva' })
  }
}
