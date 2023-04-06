const mongoose = require('mongoose')

const receiverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    bloodGroup: { type: String, required: true }
});

module.exports = mongoose.model('receiver', receiverSchema)

