import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCars = () => api.get('/car/');
export const getCarById = (id) => api.get(`/car/${id}`);
export const createCar = (car) => api.post('/car/', car);
export const updateCar = (id, car) => api.put(`/car/${id}`, car);
export const generatePdf = (carId) => api.get(`/repair/generate-pdf/${carId}`, { responseType: 'blob' });

export const repairCar = ( data) => api.put(`/repair/add-repair-details`, data);
export const agreedRepair = ( data) => api.put(`/repair/add-agreed-repair-details`, data);

export default api;
