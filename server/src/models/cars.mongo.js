const mongoose = require('mongoose');

// Subdocument for repair details
const repairDetailSchema = new mongoose.Schema({
    component: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['agreed', 'completed'], // "agreed" for agreedRepairDetails, "completed" for repairDetails
        default: 'completed'
    },
    notes: {
        type: String,
        required: false
    }
});

const carSchema = new mongoose.Schema({
    driver: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String,
        required: true,
        unique: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
    color: {
        type: String,
        required: true
    },
    incomingMileage: {
        type: Number,
        required: true
    },
    currentMileage: {
        type: Number,
        required: false
    },
    complaints: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'pending', 'completed'], // Use enumerated values for validation
        default: 'active'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    repairDetails: {
        type: [repairDetailSchema],
        required: false
    },
    agreedRepairDetails: {
        type: [repairDetailSchema],
        required: false
    },
    totalCost: {
        type: Number,
        required: false
    },
    totalCostPaid: {
        type: Number,
        required: false
    }
});

carSchema.pre('save', function (next) {
    if (this.agreedRepairDetails && this.agreedRepairDetails.length > 0) {
        this.totalCost = this.agreedRepairDetails.reduce((sum, repair) => sum + repair.cost, 0);
    } else {
        this.totalCost = 0;
    }
    next();
});

module.exports = mongoose.model('Car', carSchema);