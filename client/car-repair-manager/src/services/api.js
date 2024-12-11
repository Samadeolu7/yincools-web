import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCars = () => api.get('/cars');
export const getCarById = (id) => api.get(`/cars/${id}`);
export const createCar = (car) => api.post('/cars', car);
export const updateCar = (id, car) => api.put(`/cars/${id}`, car);
export const generatePdf = (data) => api.post('/generate-pdf', data);

export const repairCar = (id, data) => api.put(`/repair/add-repair-details`, data);

export default api;
