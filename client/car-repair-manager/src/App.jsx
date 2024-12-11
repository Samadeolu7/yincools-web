import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddCar from './pages/AddCar';
import GeneratePdf from './pages/GeneratePdf';
import GetCars from './pages/GetCars';
import GetCarById from './pages/GetCarById';
import UpdateCar from './pages/UpdateCar';
import RepairDetails from './pages/RepairDetails';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-car" element={<AddCar />} />
                    <Route path="/generate-pdf" element={<GeneratePdf />} />
                    <Route path="/get-cars" element={<GetCars />} />
                    <Route path="/get-car/:id" element={<GetCarById />} />
                    <Route path="/update-car/:id" element={<UpdateCar />} />
                    <Route path="/repair-details/:id" element={<RepairDetails />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
