import useCars from '../hooks/useCars';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const GetCars = () => {
    const { cars, loading, error } = useCars();

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

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
                            <TableRow key={car._id}>
                                <TableCell component="th" scope="row">
                                    <Box component={Link} to={`/car/${car._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {car.driver}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box component={Link} to={`/car/${car._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {car.plateNumber}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box component={Link} to={`/car/${car._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {car.make}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box component={Link} to={`/car/${car._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {car.model}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box component={Link} to={`/car/${car._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {car.color}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box component={Link} to={`/car/${car._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {car.incomingMileage}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GetCars;