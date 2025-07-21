import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Clínica Vet</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink to="/duenos" className="nav-link">Dueños</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/mascotas" className="nav-link">Mascotas</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/veterinarios" className="nav-link">Veterinarios</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/reservas" className="nav-link">Reservas</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
