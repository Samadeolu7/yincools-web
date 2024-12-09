
const express = require('express');
const router = express.Router();

router.post('/details', (req, res) => {
    const { carDetails } = req.body;

    if (!carDetails) {
        return res.status(400).json({ error: 'Car details are required' });
    }

    console.log('Car details:', carDetails);

    res.status(200).json({ message: 'Car details received', carDetails });
});

module.exports = router;