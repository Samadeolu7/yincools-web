const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path if necessary
const Car = require('../src/models/cars.mongo');

beforeAll(async () => {
    const url = process.env.MONGO_URI;
    await mongoose.connect(url);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Car API', () => {
    it('should create a new car', async () => {
        const res = await request(app)
            .post('/car')
            .send({
                driver: 'John Doe',
                plateNumber: `ABC123_${Date.now()}`, // Use unique plateNumber
                make: 'Toyota',
                model: 'Camry',
                year: 2020,
                color: 'Blue',
                incomingMileage: 15000,
                currentMileage: 16000,
                complaints: 'Engine noise'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    }, 20000); // Increase timeout to 20 seconds

    it('should get all cars', async () => {
        const res = await request(app).get('/car');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    }, 20000); // Increase timeout to 20 seconds

    it('should get a car by ID', async () => {
        const car = await Car.create({
            driver: 'Jane Doe',
            plateNumber: `XYZ789_${Date.now()}`, // Use unique plateNumber
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            color: 'Red',
            incomingMileage: 12000,
            currentMileage: 13000,
            complaints: 'Brake issues'
        });
        const res = await request(app).get(`/car/${car._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', car._id.toString());
    }, 20000); // Increase timeout to 20 seconds

    it('should update a car', async () => {
        const car = await Car.create({
            driver: 'Jane Doe',
            plateNumber: `XYZ789_${Date.now()}`, // Use unique plateNumber
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            color: 'Red',
            incomingMileage: 12000,
            currentMileage: 13000,
            complaints: 'Brake issues'
        });
        const res = await request(app)
            .put(`/car/${car._id}`)
            .send({
                driver: 'Jane Smith',
                plateNumber: `XYZ789_${Date.now()}`, // Use unique plateNumber
                make: 'Honda',
                model: 'Civic',
                year: 2019,
                color: 'Red',
                incomingMileage: 12000,
                currentMileage: 13000,
                complaints: 'Brake issues'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('driver', 'Jane Smith');
    }, 20000); // Increase timeout to 20 seconds

    it('should delete a car', async () => {
        const car = await Car.create({
            driver: 'Jane Doe',
            plateNumber: `XYZ789_${Date.now()}`, // Use unique plateNumber
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            color: 'Red',
            incomingMileage: 12000,
            currentMileage: 13000,
            complaints: 'Brake issues'
        });
        const res = await request(app).delete(`/car/${car._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', car._id.toString());
    }, 20000); // Increase timeout to 20 seconds
});

describe('Repair API', () => {
    it('should add repair details to a car', async () => {
        const car = await Car.create({
            driver: 'John Doe',
            plateNumber: `ABC123_${Date.now()}`, // Use unique plateNumber
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            color: 'Blue',
            incomingMileage: 15000,
            currentMileage: 16000,
            complaints: 'Engine noise'
        });
        const res = await request(app)
            .post('/repair/add-repair-details')
            .send({
                carId: car._id,
                repairDetails: [
                    {
                        component: 'Engine',
                        cost: 500.00,
                        status: 'completed',
                        notes: 'Replaced engine oil'
                    }
                ]
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.car.repairDetails).toHaveLength(1);
    }, 20000); // Increase timeout to 20 seconds

    it('should generate a PDF for a car', async () => {
        const car = await Car.create({
            driver: 'John Doe',
            plateNumber: `ABC123_${Date.now()}`, // Use unique plateNumber
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            color: 'Blue',
            incomingMileage: 15000,
            currentMileage: 16000,
            complaints: 'Engine noise',
            repairDetails: [
                {
                    component: 'Engine',
                    cost: 500.00,
                    status: 'completed',
                    notes: 'Replaced engine oil'
                }
            ]
        });
        const res = await request(app).get(`/repair/generate-pdf/${car._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('fileUrl');
    }, 20000); // Increase timeout to 20 seconds
});
