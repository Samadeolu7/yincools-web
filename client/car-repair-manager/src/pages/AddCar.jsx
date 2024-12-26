import CarForm from '../components/CarForm';
import { createCar } from '../services/api';
import { Box, Typography } from '@mui/material';

const AddCar = () => {
    const handleSubmit = async (data) => {
        try {
            await createCar(data);
            
            alert('Car added successfully!');
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Error adding car');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Add Car</Typography>
            <CarForm onSubmit={handleSubmit} />
        </Box>
    );
};

export default AddCar;
