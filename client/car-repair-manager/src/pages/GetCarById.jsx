
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/api';
import { Typography, Paper, Box } from '@mui/material';

const GetCarById = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await getCarById(id);
                setCar(data);
            } catch (error) {
                console.error('Error fetching car:', error);
            }
        };

        fetchCar();
    }, [id]);

    if (!car) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Car Details</Typography>
            <Box>
                <Typography variant="body1"><strong>Driver:</strong> {car.driver}</Typography>
                <Typography variant="body1"><strong>Plate Number:</strong> {car.plateNumber}</Typography>
                <Typography variant="body1"><strong>Make:</strong> {car.make}</Typography>
                <Typography variant="body1"><strong>Model:</strong> {car.model}</Typography>
                <Typography variant="body1"><strong>Color:</strong> {car.color}</Typography>
                <Typography variant="body1"><strong>Mileage:</strong> {car.incomingMileage}</Typography>
                <Typography variant="body1"><strong>Complaints:</strong> {car.complaints}</Typography>
            </Box>
        </Paper>
    );
};

export default GetCarById;