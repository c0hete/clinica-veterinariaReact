import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/dueno'

export const getDuenos = () => axios.get(API_URL)
export const getDuenoById = id => axios.get(`${API_URL}/${id}`)
export const createDueno = data => axios.post(API_URL, data)
export const updateDueno = (id, data) => axios.put(`${API_URL}/${id}`, data)
export const deleteDueno = id => axios.delete(`${API_URL}/${id}`)
