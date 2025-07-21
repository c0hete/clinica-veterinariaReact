import React from 'react'
import { Link } from 'react-router-dom'
import cachorrosImg from '../../assets/images/cachorros.avif'



const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 mb-3">Bienvenido a Clínica Veterinaria</h1>
      <p className="lead mb-4">Gestión de dueños, mascotas, veterinarios y reservas.</p>

      <div className="row justify-content-center">
        <div className="col-md-3">
          <Link to="/duenos" className="btn btn-outline-primary btn-lg w-100 mb-3">Administrar Dueños</Link>
        </div>
        <div className="col-md-3">
          <Link to="/mascotas" className="btn btn-outline-success btn-lg w-100 mb-3">Administrar Mascotas</Link>
        </div>
        <div className="col-md-3">
          <Link to="/veterinarios" className="btn btn-outline-warning btn-lg w-100 mb-3">Administrar Veterinarios</Link>
        </div>
        <div className="col-md-3">
          <Link to="/reservas" className="btn btn-outline-danger btn-lg w-100 mb-3">Ver Reservas</Link>
        </div>
      </div>

    <img
    src={cachorrosImg}
    alt="Cachorros veterinaria"
    className="img-fluid mt-4 rounded shadow"
    style={{ maxHeight: '300px' }}
    />

    </div>
  )
}

export default Home
