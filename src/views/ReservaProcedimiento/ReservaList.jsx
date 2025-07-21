import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const ReservaList = () => {
  const [reservas, setReservas] = useState([])

  const fetchReservas = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/reserva_procedimiento`)
      setReservas(data)
    } catch (error) {
      console.error('Error al obtener reservas:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar esta reserva?')) {
      try {
        await axios.delete(`${API_BASE}/reserva_procedimiento/${id}`)
        fetchReservas()
      } catch (error) {
        console.error('Error al eliminar reserva:', error)
      }
    }
  }

  useEffect(() => {
    fetchReservas()
  }, [])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Reservas de Procedimientos</h2>
        <Link to="/reservas/nueva" className="btn btn-primary">Agregar Reserva</Link>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID Mascota</th>
            <th>ID Veterinario</th>
            <th>Procedimiento</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(r => (
            <tr key={r.id}>
              <td>{r.id_mascota}</td>
              <td>{r.id_veterinario}</td>
              <td>{r.tipo_procedimiento}</td>
              <td>{r.fecha}</td>
              <td>{r.hora}</td>
              <td>
                <Link to={`/reservas/editar/${r.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button onClick={() => handleDelete(r.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReservaList
