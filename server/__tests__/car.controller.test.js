
const { handleGetAllCars, handleGetCarById, handleCreateCar, handleUpdateCar, handleDeleteCar } = require('../src/controllers/car.controller');
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('../src/models/cars.model');

jest.mock('../src/models/cars.model');

describe('Car Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should get all cars', async () => {
        getAllCars.mockResolvedValue([{ driver: 'John Doe' }]);
        await handleGetAllCars(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ driver: 'John Doe' }]);
    });

    it('should get a car by ID', async () => {
        req.params.id = '123';
        getCarById.mockResolvedValue({ driver: 'John Doe' });
        await handleGetCarById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ driver: 'John Doe' });
    });

    it('should create a car', async () => {
        req.body = { driver: 'John Doe' };
        createCar.mockResolvedValue({ _id: '123', driver: 'John Doe' });
        await handleCreateCar(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ _id: '123', driver: 'John Doe' });
    });

    it('should update a car', async () => {
        req.params.id = '123';
        req.body = { driver: 'Jane Doe' };
        updateCar.mockResolvedValue({ _id: '123', driver: 'Jane Doe' });
        await handleUpdateCar(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ _id: '123', driver: 'Jane Doe' });
    });

    it('should delete a car', async () => {
        req.params.id = '123';
        deleteCar.mockResolvedValue({ _id: '123' });
        await handleDeleteCar(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ _id: '123' });
    });
});