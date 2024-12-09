const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { getCarById, updateCar } = require('../models/cars.model');

async function handleAddRepairDetails(req, res) {
    const { carId, repairDetails } = req.body;

    if (!carId || !repairDetails) {
        return res.status(400).json({ error: 'Car ID and repair details are required' });
    }

    try {
        const car = await getCarById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        car.repairDetails.push(...repairDetails);
        await updateCar(carId, car);

        res.status(200).json({ message: 'Repair details added successfully', car });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleGenerateEstimatePDF(req, res) {
    const { carId } = req.params;

    if (!carId) {
        return res.status(400).json({ error: 'Car ID is required' });
    }

    try {
        const car = await getCarById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Path to save the PDF
        const fileName = `invoice_${Date.now()}.pdf`;
        const filePath = path.join(__dirname, '../pdfs', fileName);

        // Stream the PDF to the file
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Letterhead
        doc
            .image('path/to/letterhead.png', 50, 20, { width: 500 }) // Adjust path to your letterhead image
            .moveDown();

        // Add Car Details
        doc.fontSize(14).text('Car Details', { underline: true }).moveDown();
        Object.entries(car.toObject()).forEach(([key, value]) => {
            if (key !== 'repairDetails' && key !== 'agreedRepairDetails') {
                doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
            }
        });
        doc.moveDown();

        // Add Repairs Table
        doc.fontSize(14).text('Repair Details', { underline: true }).moveDown();
        const tableStartY = doc.y;
        doc.text('Component', 50, tableStartY);
        doc.text('Cost', 300, tableStartY);
        doc.text('Notes', 400, tableStartY);
        doc.moveDown();

        car.repairDetails.forEach((repair) => {
            const rowY = doc.y;
            doc.text(repair.component, 50, rowY);
            doc.text(`$${repair.cost.toFixed(2)}`, 300, rowY);
            doc.text(repair.notes || 'N/A', 400, rowY);
            doc.moveDown();
        });

        // Finalize the document
        doc.end();

        // Return the file URL
        stream.on('finish', () => {
            res.json({ fileUrl: `/pdfs/${fileName}` });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleAddRepairDetails,
    handleGenerateEstimatePDF
};