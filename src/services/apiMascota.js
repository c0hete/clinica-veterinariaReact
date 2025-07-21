import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/mascota'

export const getMascotas = () => axios.get(API_URL)
export const getMascotaById = id => axios.get(`${API_URL}/${id}`)
export const createMascota = data => axios.post(API_URL, data)
export const updateMascota = (id, data) => axios.put(`${API_URL}/${id}`, data)
export const deleteMascota = id => axios.delete(`${API_URL}/${id}`)
