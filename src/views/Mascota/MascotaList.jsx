import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const MascotaList = () => {
  const [mascotas, setMascotas] = useState([])

  const fetchMascotas = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/mascota`)
      setMascotas(data)
    } catch (error) {
      console.error('Error al obtener mascotas:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        await axios.delete(`${API_BASE}/mascota/${id}`)
        fetchMascotas()
      } catch (error) {
        console.error('Error al eliminar mascota:', error)
      }
    }
  }

  useEffect(() => {
    fetchMascotas()
  }, [])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Mascotas</h2>
        <Link to="/mascotas/nueva" className="btn btn-primary">Agregar Mascota</Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Edad</th>
            <th>Raza</th>
            <th>ID Dueño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map(m => (
            <tr key={m.id}>
              <td>{m.nombre_mascota}</td>
              <td>{m.tipo_animal}</td>
              <td>{m.edad}</td>
              <td>{m.raza}</td>
              <td>{m.id_dueno}</td>
              <td>
                <Link to={`/mascotas/editar/${m.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button onClick={() => handleDelete(m.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MascotaList
