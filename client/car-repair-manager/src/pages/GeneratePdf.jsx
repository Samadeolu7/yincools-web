import { generatePdf } from '../services/api';
import RepairTable from '../components/RepairTable';
import { Box, Button, Typography } from '@mui/material';

const GeneratePdf = ({ carDetails, repairDetails }) => {
    const handleGeneratePdf = async () => {
        try {
            const { data } = await generatePdf({ carDetails });
            alert('PDF generated! URL: ' + data.fileUrl);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Generate PDF</Typography>
            <RepairTable repairs={repairDetails} />
            <Button onClick={handleGeneratePdf} variant="contained" color="primary" sx={{ mt: 2 }}>Generate PDF</Button>
        </Box>
    );
};



export default GeneratePdf;
