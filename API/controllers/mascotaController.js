const pool = require('../config/db')

// Obtener todas las mascotas
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mascota')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mascotas' })
  }
}

// Obtener una mascota por ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mascota WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Mascota no encontrada' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mascota' })
  }
}

// Crear una nueva mascota
exports.create = async (req, res) => {
  const { nombre_mascota, tipo_animal, edad, raza, id_dueno } = req.body
  if (!nombre_mascota || !tipo_animal || !edad || !raza || !id_dueno) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    await pool.query(
      'INSERT INTO mascota (nombre_mascota, tipo_animal, edad, raza, id_dueno) VALUES (?, ?, ?, ?, ?)',
      [nombre_mascota, tipo_animal, edad, raza, id_dueno]
    )
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear mascota' })
  }
}

// Actualizar una mascota
exports.update = async (req, res) => {
  const { nombre_mascota, tipo_animal, edad, raza, id_dueno } = req.body
  try {
    await pool.query(
      'UPDATE mascota SET nombre_mascota=?, tipo_animal=?, edad=?, raza=?, id_dueno=? WHERE id=?',
      [nombre_mascota, tipo_animal, edad, raza, id_dueno, req.params.id]
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar mascota' })
  }
}

// Eliminar una mascota
exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM mascota WHERE id = ?', [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar mascota' })
  }
}
