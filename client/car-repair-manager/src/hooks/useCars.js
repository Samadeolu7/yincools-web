// src/hooks/useCars.js
import { useState, useEffect } from 'react';
import { getCars } from '../services/api';

const useCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data } = await getCars();
                setCars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    return { cars, loading, error };
};

export default useCars;
