import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const MascotaForm = () => {
  const [formData, setFormData] = useState({
    nombre_mascota: '',
    tipo_animal: '',
    edad: '',
    raza: '',
    id_dueno: '',
  })

  const [duenos, setDuenos] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = !!id

  useEffect(() => {
    axios.get(`${API_BASE}/dueno`)
      .then(res => setDuenos(res.data))
      .catch(err => console.error('Error cargando dueños:', err))

    if (isEdit) {
      axios.get(`${API_BASE}/mascota/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error('Error cargando mascota:', err))
    }
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    const { nombre_mascota, tipo_animal, edad, raza, id_dueno } = formData
    if (!nombre_mascota || !tipo_animal || !edad || !raza || !id_dueno) {
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
        await axios.put(`${API_BASE}/mascota/${id}`, formData)
      } else {
        await axios.post(`${API_BASE}/mascota`, formData)
      }
      navigate('/mascotas')
    } catch (err) {
      console.error(err)
      setError('Error al guardar la mascota.')
    }
  }

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Editar Mascota' : 'Nueva Mascota'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre_mascota" value={formData.nombre_mascota} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select className="form-select" name="tipo_animal" value={formData.tipo_animal} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input type="number" className="form-control" name="edad" value={formData.edad} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Raza</label>
          <input type="text" className="form-control" name="raza" value={formData.raza} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Dueño</label>
          <select className="form-select" name="id_dueno" value={formData.id_dueno} onChange={handleChange}>
            <option value="">Seleccione un dueño</option>
            {duenos.map(d => (
              <option key={d.id} value={d.id}>{d.nombre_completo}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">{isEdit ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={() => navigate('/mascotas')} className="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
  )
}

export default MascotaForm
