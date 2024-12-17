import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddCar from './pages/AddCar';
import GeneratePdf from './pages/GeneratePdf';
import GetCars from './pages/GetCars';
import GetCarById from './pages/GetCarById';
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
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/add-car"
                        element={
                            <Layout>
                                <AddCar />
                            </Layout>
                        }
                    />
                    <Route
                        path="/generate-pdf"
                        element={
                            <Layout>
                                <GeneratePdf />
                            </Layout>
                        }
                    />
                    <Route
                        path="/get-cars"
                        element={
                            <Layout>
                                <GetCars />
                            </Layout>
                        }
                    />
                    <Route
                        path="/get-car/:id"
                        element={
                            <Layout>
                                <GetCarById />
                            </Layout>
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
