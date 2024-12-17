import RepairDetailsForm from '../components/RepairDetails';
import { repairCar, agreedRepair } from '../services/api';
import { Box, Typography } from '@mui/material';

const AddRepairDetails = () => {
    const handleRepairDetailsSubmit = async (formData) => {
        try {
            const { carId, repairType, repairDetails, notes } = formData;
            const payload = {
                carId,
                repairDetails: repairDetails.map(detail => ({
                    component: [detail.component],
                    cost: [detail.cost],
                    notes: notes || ''
                }))
            };
            if (repairType === 'initial') {
                await repairCar(payload);
            } else {
                await agreedRepair(payload);
            }
            alert('Repair details added successfully');
        } catch (error) {
            console.error('Error adding repair details:', error);
            alert('Failed to add repair details');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Add Car</Typography>
            <RepairDetailsForm onSubmit={handleRepairDetailsSubmit} />
        </Box>
    );
};

export default AddRepairDetails;
