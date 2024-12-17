import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <AppBar position="fixed"> {/* Change position to fixed */}
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Car Repair Manager
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/add-car">Add Car</Button>
                <Button color="inherit" component={Link} to="/add-repair-details">Add Repair Details</Button>
                <Button color="inherit" component={Link} to="/get-cars">Get Cars</Button>
            </Box>
        </Toolbar>
    </AppBar>
);

export default Navbar;
