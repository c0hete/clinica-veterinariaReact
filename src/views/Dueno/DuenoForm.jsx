// src/views/Dueno/DuenoForm.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createDueno, getDuenoById, updateDueno } from '../../services/apiDueno'

const DuenoForm = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rut: '',
    telefono: '',
    correo: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      getDuenoById(id).then(res => {
        setFormData(res.data)
      }).catch(err => console.error(err))
    }
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    const { nombre_completo, rut, telefono, correo } = formData
    if (!nombre_completo || !rut || !telefono || !correo) {
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
        await updateDueno(id, formData)
      } else {
        await createDueno(formData)
      }
      navigate('/duenos')
    } catch (err) {
      console.error(err)
      setError('Hubo un error al guardar.')
    }
  }

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Editar Dueño' : 'Nuevo Dueño'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input type="text" name="nombre_completo" className="form-control" value={formData.nombre_completo} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">RUT</label>
          <input type="text" name="rut" className="form-control" value={formData.rut} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" name="correo" className="form-control" value={formData.correo} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">{isEdit ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={() => navigate('/duenos')} className="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
  )
}

export default DuenoForm
