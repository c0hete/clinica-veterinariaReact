import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const VeterinarioForm = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    especialidad: '',
    telefono: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_BASE}/veterinario/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error(err))
    }
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    const { nombre_completo, especialidad, telefono } = formData
    if (!nombre_completo || !especialidad || !telefono) {
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
        await axios.put(`${API_BASE}/veterinario/${id}`, formData)
      } else {
        await axios.post(`${API_BASE}/veterinario`, formData)
      }
      navigate('/veterinarios')
    } catch (err) {
      console.error(err)
      setError('Error al guardar.')
    }
  }

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Editar Veterinario' : 'Nuevo Veterinario'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Especialidad</label>
          <input type="text" className="form-control" name="especialidad" value={formData.especialidad} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">{isEdit ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={() => navigate('/veterinarios')} className="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
  )
}

export default VeterinarioForm
