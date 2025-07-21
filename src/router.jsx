import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Vistas generales
import Home from './views/Home/Home'
// Vistas de entidades
import DuenoList from './views/Dueno/DuenoList'
import DuenoForm from './views/Dueno/DuenoForm'

// Vistas de mascotas
import MascotaList from './views/Mascota/MascotaList'
import MascotaForm from './views/Mascota/MascotaForm'

// Vistas de veterinarios
import VeterinarioList from './views/Veterinario/VeterinarioList'
import VeterinarioForm from './views/Veterinario/VeterinarioForm'

// Vistas de reservas
import ReservaList from './views/ReservaProcedimiento/ReservaList'
import ReservaForm from './views/ReservaProcedimiento/ReservaForm'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* CRUD Dueños */}
        <Route path="/duenos" element={<DuenoList />} />
        <Route path="/duenos/nuevo" element={<DuenoForm />} />
        <Route path="/duenos/editar/:id" element={<DuenoForm />} />

      {/* CRUD Mascotas*/}
        <Route path="/mascotas" element={<MascotaList />} />
        <Route path="/mascotas/nueva" element={<MascotaForm />} />
        <Route path="/mascotas/editar/:id" element={<MascotaForm />} />

      {/* CRUD Veterinarios */}
        <Route path="/veterinarios" element={<VeterinarioList />} />
        <Route path="/veterinarios/nuevo" element={<VeterinarioForm />} />
        <Route path="/veterinarios/editar/:id" element={<VeterinarioForm />} />

       {/* CRUD Reservas */}
        <Route path="/reservas" element={<ReservaList />} />
        <Route path="/reservas/nueva" element={<ReservaForm />} />
        <Route path="/reservas/editar/:id" element={<ReservaForm />} />
    </Routes>
  )
}

export default Router
