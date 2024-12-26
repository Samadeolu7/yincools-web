import  { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CarForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        driver: initialData.driver || '',
        plateNumber: initialData.plateNumber || '',
        phoneNumber: initialData.phoneNumber || '',
        make: initialData.make || '',
        model: initialData.model || '',
        color: initialData.color || '',
        incomingMileage: initialData.incomingMileage || '',
        complaints: initialData.complaints || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Add/Edit Car Details</Typography>
            <TextField name="driver" label="Driver Name" value={formData.driver} onChange={handleChange} fullWidth />
            <TextField name="plateNumber" label="Plate Number" value={formData.plateNumber} onChange={handleChange} fullWidth />
            <TextField name="make" label="Make" value={formData.make} onChange={handleChange} fullWidth />
            <TextField name="model" label="Model" value={formData.model} onChange={handleChange} fullWidth />
            <TextField name="color" label="Color" value={formData.color} onChange={handleChange} fullWidth />
            <TextField
                name="incomingMileage"
                label="Incoming Mileage"
                type="number"
                value={formData.incomingMileage}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="complaints"
                label="Complaints"
                value={formData.complaints}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
    );
};
CarForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        driver: PropTypes.string,
        plateNumber: PropTypes.string,
        make: PropTypes.string,
        model: PropTypes.string,
        color: PropTypes.string,
        incomingMileage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        complaints: PropTypes.string,
    }),
};

export default CarForm;
