const mongoose = require('mongoose');

const crystalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,    
    },
    color: {
        type: String,
        required: true,    
    },
    chakra: {
        type: String,
        required: true,    
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now 
    },
})

module.exports = mongoose.model('Crystal', crystalSchema)