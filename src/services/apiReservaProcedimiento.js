import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/reserva_procedimiento'

export const getReservas = () => axios.get(API_URL)
export const getReservaById = id => axios.get(`${API_URL}/${id}`)
export const createReserva = data => axios.post(API_URL, data)
export const updateReserva = (id, data) => axios.put(`${API_URL}/${id}`, data)
export const deleteReserva = id => axios.delete(`${API_URL}/${id}`)
