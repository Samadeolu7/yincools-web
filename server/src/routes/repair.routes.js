const express = require('express');
const { handleAddRepairDetails, handleGenerateEstimatePDF } = require('../controllers/repair.controller');
const path = require('path');
const router = express.Router();

router.post('/add-repair-details', handleAddRepairDetails);
router.get('/generate-pdf/:carId', handleGenerateEstimatePDF);
router.use('/pdfs', express.static(path.join(__dirname, '../pdfs')));

module.exports = router;