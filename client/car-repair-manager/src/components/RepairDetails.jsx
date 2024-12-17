import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import useCars from '../hooks/useCars';

const RepairDetailsForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        carId: initialData.carId || '',
        repairDetails: initialData.repairDetails || [{ component: '', cost: '' }],
        status: initialData.status || 'agreed',
        notes: initialData.notes || '',
        repairType: initialData.repairType || 'initial', // Add repairType to formData
    });

    const { cars, loading, error } = useCars();

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRepairDetails = [...formData.repairDetails];
        updatedRepairDetails[index][name] = value;
        setFormData({ ...formData, repairDetails: updatedRepairDetails });
    };

    const handleAddRow = () => {
        setFormData({ ...formData, repairDetails: [...formData.repairDetails, { component: '', cost: '' }] });
    };

    const handleRemoveRow = (index) => {
        const updatedRepairDetails = formData.repairDetails.filter((_, i) => i !== index);
        setFormData({ ...formData, repairDetails: updatedRepairDetails });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Add/Edit Repair Details</Typography>
            <FormControl fullWidth>
                <InputLabel id="car-select-label">Select Car</InputLabel>
                <Select
                    labelId="car-select-label"
                    name="carId"
                    value={formData.carId}
                    onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                    label="Select Car"
                >
                    {cars.map((car) => (
                        <MenuItem key={car._id} value={car._id}>
                            {car.driver} - {car.plateNumber}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl component="fieldset">
                <Typography component="legend">Repair Type</Typography>
                <RadioGroup
                    name="repairType"
                    value={formData.repairType}
                    onChange={(e) => setFormData({ ...formData, repairType: e.target.value })}
                    row
                >
                    <FormControlLabel value="initial" control={<Radio />} label="Initial" />
                    <FormControlLabel value="final" control={<Radio />} label="Final/Agreed" />
                </RadioGroup>
            </FormControl>
            {formData.repairDetails.map((repairDetail, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        name="component"
                        label="Component"
                        value={repairDetail.component}
                        onChange={(e) => handleChange(e, index)}
                        fullWidth
                    />
                    <TextField
                        name="cost"
                        label="Cost"
                        type="number"
                        value={repairDetail.cost}
                        onChange={(e) => handleChange(e, index)}
                        fullWidth
                    />
                    <IconButton onClick={() => handleRemoveRow(index)} disabled={formData.repairDetails.length === 1}>
                        <RemoveIcon />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={handleAddRow} startIcon={<AddIcon />} variant="outlined">
                Add Row
            </Button>
            <TextField
                name="notes"
                label="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                multiline
                rows={4}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
    );
};

RepairDetailsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        carId: PropTypes.string,
        repairDetails: PropTypes.arrayOf(
            PropTypes.shape({
                component: PropTypes.string,
                cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            })
        ),
        status: PropTypes.string,
        notes: PropTypes.string,
        repairType: PropTypes.string,
    }),
};

export default RepairDetailsForm;