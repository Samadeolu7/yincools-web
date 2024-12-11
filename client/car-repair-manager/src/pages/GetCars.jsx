
import React, { useEffect, useState } from 'react';
import { getCars } from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const GetCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data } = await getCars();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Cars List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Driver</TableCell>
                            <TableCell>Plate Number</TableCell>
                            <TableCell>Make</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Mileage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car.driver}</TableCell>
                                <TableCell>{car.plateNumber}</TableCell>
                                <TableCell>{car.make}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.color}</TableCell>
                                <TableCell>{car.incomingMileage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GetCars;