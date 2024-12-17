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

async function handleAddAgreedRepairDetails(req, res) {
    const { carId, repairDetails } = req.body;

    if (!carId || !repairDetails) {
        return res.status(400).json({ error: 'Car ID and repair details are required' });
    }

    try {
        const car = await getCarById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        car.agreedRepairDetails.push(...repairDetails);
        await updateCar(carId, car);

        res.status(200).json({ message: 'Agreed repair details added successfully', car });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function handleGenerateEstimatePDF(req, res) {
    console.log('Generating PDF...');
    console.log('req.params:', req.params);
    const { carId } = req.params;

    if (!carId) {
        return res.status(400).json({ error: 'Car ID is required' });
    }

    try {
        const car = await getCarById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Disposition', `attachment; filename=invoice_${Date.now()}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);

        // Add Letterhead
        doc
            .image(path.join(__dirname, '../../public/images/letterhead.jpg'), 50, 20, { width: 500 })
            .moveDown(7);

        // Add Title
        doc
            .fontSize(20)
            .font('Helvetica-Bold')
            .text('Repair Estimate', { align: 'center' })
            .moveDown();

        // Add Car Details Table
        doc
            .fontSize(14)
            .font('Helvetica-Bold')
            .text('Car Details', { underline: true })
            .moveDown();

        const excludedKeys = ['createdAt', 'totalCost', '_id', '__v', 'status', 'currentMileage', 'incomingMileage', 'repairDetails', 'agreedRepairDetails'];
        const carDetails = Object.entries(car.toObject()).filter(
            ([key]) => !excludedKeys.includes(key)
        );

        const carTableStartY = doc.y;
        const cellPadding = 5;

        carDetails.forEach(([key, value], index) => {
            const rowY = carTableStartY + index * 20;
            const bgColor = index % 2 === 0 ? '#f2f2f2' : '#ffffff';

            // Draw row background
            doc.rect(50, rowY, 500, 20).fill(bgColor).stroke();

            // Field name
            doc
                .fillColor('#000')
                .font('Helvetica-Bold')
                .fontSize(12)
                .text(key.charAt(0).toUpperCase() + key.slice(1), 55, rowY + cellPadding);

            // Field value
            doc
                .font('Helvetica')
                .fontSize(12)
                .text(value, 300, rowY + cellPadding);
        });

        doc.moveDown(carDetails.length * 0.4);

        // Add Repairs Table
        doc
            .fontSize(14)
            .font('Helvetica-Bold')
            .text('Repair Details', { underline: true })
            .moveDown();

        const repairTableStartY = doc.y;

        // Table header
        const headerRowHeight = 20;
        const headerBgColor = '#cce5ff';

        doc
            .rect(50, repairTableStartY, 500, headerRowHeight)
            .fill(headerBgColor)
            .stroke();

        doc
            .font('Helvetica-Bold')
            .fillColor('#000')
            .fontSize(12)
            .text('Component', 55, repairTableStartY + cellPadding)
            .text('Cost', 300, repairTableStartY + cellPadding, { align: 'right' })

        let currentY = repairTableStartY + headerRowHeight;

        car.repairDetails.forEach((repair, index) => {
            const bgColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

            // Draw row background
            doc.rect(50, currentY, 500, 20).fill(bgColor).stroke();

            // Table cells
            doc
                .fillColor('#000')
                .font('Helvetica')
                .fontSize(12)
                .text(repair.component.join(', '), 55, currentY + cellPadding)
                .text(`$${repair.cost.reduce((sum, cost) => sum + cost, 0).toFixed(2)}`, 300, currentY + cellPadding, { align: 'right' })

            currentY += 20;
        });

        // Add Summary
        const totalCost = car.repairDetails.reduce((sum, repair) => sum + repair.cost.reduce((sum, cost) => sum + cost, 0), 0);
        doc
            .font('Helvetica-Bold')
            .fontSize(14)
            .moveDown()
            .text(`Total Cost: $${totalCost.toFixed(2)}`, { align: 'right' })
            .moveDown();

        // add agreed repair details if available
        if (car.agreedRepairDetails.length > 0) {
            doc
                .fontSize(14)
                .font('Helvetica-Bold')
                .text('Agreed Repair Details', { underline: true })
                .moveDown();

            const agreedRepairTableStartY = doc.y;

            // Table header
            doc
                .rect(50, agreedRepairTableStartY, 500, headerRowHeight)
                .fill(headerBgColor)
                .stroke();

            doc
                .font('Helvetica-Bold')
                .fillColor('#000')
                .fontSize(12)
                .text('Component', 55, agreedRepairTableStartY + cellPadding)
                .text('Cost', 300, agreedRepairTableStartY + cellPadding, { align: 'right' })

            currentY = agreedRepairTableStartY + headerRowHeight;

            car.agreedRepairDetails.forEach((repair, index) => {
                const bgColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

                // Draw row background
                doc.rect(50, currentY, 500, 20).fill(bgColor).stroke();

                // Table cells
                doc
                    .fillColor('#000')
                    .font('Helvetica')
                    .fontSize(12)
                    .text(repair.component.join(', '), 55, currentY + cellPadding)
                    .text(`$${repair.cost.reduce((sum, cost) => sum + cost, 0).toFixed(2)}`, 300, currentY + cellPadding, { align: 'right' })

                currentY += 20;
            });

            // Add Summary
            const totalAgreedCost = car.agreedRepairDetails.reduce((sum, repair) => sum + repair.cost.reduce((sum, cost) => sum + cost, 0), 0);
            doc
                .font('Helvetica-Bold')
                .fontSize(14)
                .moveDown()
                .text(`Total Agreed Cost: $${totalAgreedCost.toFixed(2)}`, { align: 'right' })
                .moveDown();
        }

        // Finalize the document
        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    handleAddRepairDetails,
    handleAddAgreedRepairDetails,
    handleGenerateEstimatePDF
};