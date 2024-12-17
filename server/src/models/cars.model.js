const cars = require('./cars.mongo');

// Get all cars
async function getAllCars() {
    try {
        return await cars.find({}, { __v: 0 });
    } catch (error) {
        throw new Error('Error fetching cars: ' + error.message);
    }
}

// Get car by ID
async function getCarById(id) {
    try {
        console.log('id:', id);
        const car = await cars.findById(id).populate('repairDetails').populate('agreedRepairDetails');

        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    } catch (error) {
        throw new Error('Error fetching car by ID: ' + error.message);
    }
}

// Create a car
async function createCar(car) {
    try {
        return await cars.create(car);
    } catch (error) {
        throw new Error('Error creating car: ' + error.message);
    }
}

// Update a car
async function updateCar(id, car) {
    try {
        const updatedCar = await cars.findByIdAndUpdate(id, car, { new: true });
        if (!updatedCar) {
            throw new Error('Car not found');
        }
        return updatedCar;
    } catch (error) {
        throw new Error('Error updating car: ' + error.message);
    }
}

// Delete a car
async function deleteCar(id) {
    try {
        const deletedCar = await cars.findByIdAndDelete(id);
        if (!deletedCar) {
            throw new Error('Car not found');
        }
        return deletedCar;
    } catch (error) {
        throw new Error('Error deleting car: ' + error.message);
    }
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};