// src/hooks/useCarDetails.js
import { useState, useEffect } from 'react';
import { getCarById } from '../services/api';

const useCarDetails = (carId) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!carId) return;

        const getCarDetails = async () => {
            try {
                const res = await getCarById(carId);
                setCar(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCarDetails();
    }, [carId]);

    return { car, loading, error };
};

export default useCarDetails;
