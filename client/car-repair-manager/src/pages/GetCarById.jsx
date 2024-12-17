import { useParams } from 'react-router-dom';
import useCarDetails from '../hooks/useCarDetails';
import { Typography, Paper, Box, Grid, Button } from '@mui/material';
import { generatePdf } from '../services/api';

const GetCarById = () => {
    const { id } = useParams();
    const { car, loading, error } = useCarDetails(id);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;
    if (!car) return <Typography>Car not found</Typography>;

    const calculateTotalCost = (details) => {
        return details.reduce((total, detail) => total + detail.cost.reduce((sum, cost) => sum + cost, 0), 0);
    };

    const totalRepairCost = calculateTotalCost(car.repairDetails);
    const totalAgreedRepairCost = calculateTotalCost(car.agreedRepairDetails);

    const handleGeneratePdf = async () => {
        try {
            const response = await generatePdf(car._id);
    
            // Create a Blob from the response data
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
    
            // Provide a filename (optional, but better UX)
            const fileName = `invoice_${car._id}.pdf`;
            link.setAttribute('download', fileName);
    
            // Append the link to the DOM and trigger click
            document.body.appendChild(link);
            link.click();
    
            // Clean up
            URL.revokeObjectURL(link.href);
            link.remove();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Paper sx={{ p: 2, maxWidth: 600 }}>
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
                <Box mt={2}>
                    <Typography variant="h6">Repair Details</Typography>
                    {car.repairDetails.length > 0 ? (
                        <>
                            {car.repairDetails.map((detail, index) => (
                                <Box key={index} mt={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"><strong>Component:</strong> {detail.component.join(', ')}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"><strong>Cost:</strong> {detail.cost.join(', ')}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2"><strong>Total Cost:</strong> ${totalRepairCost.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2"><strong>Notes:</strong> {car.repairDetails[0].notes}</Typography>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="body2">No repair details available</Typography>
                    )}
                </Box>
                <Box mt={2}>
                    <Typography variant="h6">Agreed Repair Details</Typography>
                    {car.agreedRepairDetails.length > 0 ? (
                        <>
                            {car.agreedRepairDetails.map((detail, index) => (
                                <Box key={index} mt={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"><strong>Component:</strong> {detail.component.join(', ')}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"><strong>Cost:</strong> {detail.cost.join(', ')}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2"><strong>Total Cost:</strong> ${totalAgreedRepairCost.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2"><strong>Notes:</strong> {car.agreedRepairDetails[0].notes}</Typography>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="body2">No agreed repair details available</Typography>
                    )}
                </Box>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleGeneratePdf}>
                        Generate PDF
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default GetCarById;