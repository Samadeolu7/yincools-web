const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('../models/cars.model');

async function handleGetAllCars(req, res) {
    try {
        const cars = await getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleGetCarById(req, res) {
    try {
        const car = await getCarById(req.params.id);
        res.status(200).json(car);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function handleCreateCar(req, res) {
    try {
        const car = await createCar(req.body);
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function handleUpdateCar(req, res) {
    try {
        const car = await updateCar(req.params.id, req.body);
        res.status(200).json(car);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function handleDeleteCar(req, res) {
    try {
        const car = await deleteCar(req.params.id);
        res.status(200).json(car);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    handleGetAllCars,
    handleGetCarById,
    handleCreateCar,
    handleUpdateCar,
    handleDeleteCar
};