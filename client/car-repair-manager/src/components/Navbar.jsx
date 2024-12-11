import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Car Repair Manager
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/add-car">Add Car</Button>
            <Button color="inherit" component={Link} to="/generate-pdf">Generate PDF</Button>
            <Button color="inherit" component={Link} to="/get-cars">Get Cars</Button>
            <Button color="inherit" component={Link} to="/get-car/:id">Get Car by ID</Button>
            <Button color="inherit" component={Link} to="/update-car/:id">Update Car</Button>
            <Button color="inherit" component={Link} to="/repair-details/:id">Repair Details</Button>
        </Toolbar>
    </AppBar>
);

export default Navbar;
