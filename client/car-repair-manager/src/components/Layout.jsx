import { Box, Container } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 10 }}> {/* Add top margin */}
                <Box>{children}</Box>
            </Container>
        </>
    );
};

export default Layout;
