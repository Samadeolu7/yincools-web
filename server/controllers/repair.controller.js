
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function handleGenerateEstimatePDF(req, res) {
    const { carDetails, repairDetails } = req.body;

    if (!carDetails || !repairDetails) {
        return res.status(400).json({ error: 'Car details and repair details are required' });
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
    Object.entries(carDetails).forEach(([key, value]) => {
        doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
    });
    doc.moveDown();

    // Add Repairs Table
    doc.fontSize(14).text('Repair Details', { underline: true }).moveDown();
    const tableStartY = doc.y;
    doc.text('Component', 50, tableStartY);
    doc.text('Cost', 300, tableStartY);
    doc.text('Notes', 400, tableStartY);
    doc.moveDown();

    repairDetails.forEach((repair) => {
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
}

module.exports = {
    handleGenerateEstimatePDF
};