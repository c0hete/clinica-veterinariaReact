import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const ReservaForm = () => {
  const [formData, setFormData] = useState({
    id_mascota: '',
    id_veterinario: '',
    tipo_procedimiento: '',
    fecha: '',
    hora: '',
  })

  const [mascotas, setMascotas] = useState([])
  const [veterinarios, setVeterinarios] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  useEffect(() => {
    axios.get(`${API_BASE}/mascota`)
      .then(res => setMascotas(res.data))
      .catch(err => console.error('Error cargando mascotas:', err))

    axios.get(`${API_BASE}/veterinario`)
      .then(res => setVeterinarios(res.data))
      .catch(err => console.error('Error cargando veterinarios:', err))

    if (isEdit) {
      axios.get(`${API_BASE}/reserva_procedimiento/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error('Error cargando reserva:', err))
    }
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const { id_mascota, id_veterinario, tipo_procedimiento, fecha, hora } = formData
    if (!id_mascota || !id_veterinario || !tipo_procedimiento || !fecha || !hora) {
      setError('Todos los campos son obligatorios.')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      if (isEdit) {
        await axios.put(`${API_BASE}/reserva_procedimiento/${id}`, formData)
      } else {
        await axios.post(`${API_BASE}/reserva_procedimiento`, formData)
      }
      navigate('/reservas')
    } catch (err) {
      console.error(err)
      setError('Error al guardar reserva.')
    }
  }

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Mascota</label>
          <select name="id_mascota" className="form-select" value={formData.id_mascota} onChange={handleChange}>
            <option value="">Seleccione</option>
            {mascotas.map(m => (
              <option key={m.id} value={m.id}>{m.nombre_mascota}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Veterinario</label>
          <select name="id_veterinario" className="form-select" value={formData.id_veterinario} onChange={handleChange}>
            <option value="">Seleccione</option>
            {veterinarios.map(v => (
              <option key={v.id} value={v.id}>{v.nombre_completo}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de procedimiento</label>
          <input type="text" className="form-control" name="tipo_procedimiento" value={formData.tipo_procedimiento} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" name="fecha" value={formData.fecha} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input type="time" className="form-control" name="hora" value={formData.hora} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">{isEdit ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={() => navigate('/reservas')} className="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
  )
}

export default ReservaForm
