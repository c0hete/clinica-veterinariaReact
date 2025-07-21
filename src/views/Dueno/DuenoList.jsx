// src/views/Dueno/DuenoList.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDuenos, deleteDueno } from '../../services/apiDueno'

const DuenoList = () => {
  const [duenos, setDuenos] = useState([])

  const fetchDuenos = async () => {
    try {
      const { data } = await getDuenos()
      setDuenos(data)
    } catch (error) {
      console.error('Error al obtener dueños:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este dueño?')) {
      try {
        await deleteDueno(id)
        fetchDuenos()
      } catch (error) {
        console.error('Error al eliminar:', error)
      }
    }
  }

  useEffect(() => {
    fetchDuenos()
  }, [])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Dueños</h2>
        <Link to="/duenos/nuevo" className="btn btn-primary">Agregar Dueño</Link>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {duenos.map(dueno => (
            <tr key={dueno.id}>
              <td>{dueno.nombre_completo}</td>
              <td>{dueno.rut}</td>
              <td>{dueno.telefono}</td>
              <td>{dueno.correo}</td>
              <td>
                <Link to={`/duenos/editar/${dueno.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button onClick={() => handleDelete(dueno.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DuenoList
