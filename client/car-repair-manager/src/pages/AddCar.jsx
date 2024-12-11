import React from 'react';
import CarForm from '../components/CarForm';
import { createCar } from '../services/api';

const AddCar = () => {
    const handleSubmit = async (data) => {
        try {
            await createCar(data);
            alert('Car added successfully!');
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <div>
            <h1>Add Car</h1>
            <CarForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddCar;
