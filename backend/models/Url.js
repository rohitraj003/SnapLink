const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    _id: Number, 
    longUrl: { type: String, required: true },
    shortCode: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);