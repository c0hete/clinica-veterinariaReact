import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/veterinario'

export const getVeterinarios = () => axios.get(API_URL)
export const getVeterinarioById = id => axios.get(`${API_URL}/${id}`)
export const createVeterinario = data => axios.post(API_URL, data)
export const updateVeterinario = (id, data) => axios.put(`${API_URL}/${id}`, data)
export const deleteVeterinario = id => axios.delete(`${API_URL}/${id}`)
