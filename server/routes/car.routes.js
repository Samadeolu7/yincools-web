const express = require('express');
const {
    handleGetAllCars,
    handleGetCarById,
    handleCreateCar,
    handleUpdateCar,
    handleDeleteCar
} = require('../controllers/car.controller');
const router = express.Router();

router.get('/', handleGetAllCars);
router.get('/:id', handleGetCarById);
router.post('/', handleCreateCar);
router.put('/:id', handleUpdateCar);
router.delete('/:id', handleDeleteCar);

module.exports = router;