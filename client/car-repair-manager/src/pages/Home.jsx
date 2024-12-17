import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Car Repair Manager
            </Typography>
            <Typography variant="body1">
                Manage your car repairs, generate reports, and stay organized.
            </Typography>
        </Box>
    );
};

export default Home;
