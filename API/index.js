require('dotenv').config()
const express = require('express')
const cors = require('cors')

const duenoRoutes = require('./routes/duenoRoutes')
const mascotaRoutes = require('./routes/mascotaRoutes')
const veterinarioRoutes = require('./routes/veterinarioRoutes')
const reservaRoutes = require('./routes/reservaRoutes')





const app = express()
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/dueno', duenoRoutes)
app.use('/api/mascota', mascotaRoutes)
app.use('/api/veterinario', veterinarioRoutes)
app.use('/api/reserva_procedimiento', reservaRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`)
})
