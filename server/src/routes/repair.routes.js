const express = require('express');
const { handleAddRepairDetails, handleGenerateEstimatePDF, handleAddAgreedRepairDetails } = require('../controllers/repair.controller');
const path = require('path');
const router = express.Router();

router.put('/add-repair-details', handleAddRepairDetails);
router.get('/generate-pdf/:carId', handleGenerateEstimatePDF);
router.put('/add-agreed-repair-details', handleAddAgreedRepairDetails);
router.use('/pdfs', express.static(path.join(__dirname, '../pdfs')));

module.exports = router;