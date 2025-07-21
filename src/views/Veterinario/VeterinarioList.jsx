import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const VeterinarioList = () => {
  const [veterinarios, setVeterinarios] = useState([])

  const fetchVeterinarios = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/veterinario`)
      setVeterinarios(data)
    } catch (error) {
      console.error('Error al obtener veterinarios:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este veterinario?')) {
      try {
        await axios.delete(`${API_BASE}/veterinario/${id}`)
        fetchVeterinarios()
      } catch (error) {
        console.error('Error al eliminar veterinario:', error)
      }
    }
  }

  useEffect(() => {
    fetchVeterinarios()
  }, [])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Veterinarios</h2>
        <Link to="/veterinarios/nuevo" className="btn btn-primary">Agregar Veterinario</Link>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {veterinarios.map(v => (
            <tr key={v.id}>
              <td>{v.nombre_completo}</td>
              <td>{v.especialidad}</td>
              <td>{v.telefono}</td>
              <td>
                <Link to={`/veterinarios/editar/${v.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button onClick={() => handleDelete(v.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VeterinarioList
