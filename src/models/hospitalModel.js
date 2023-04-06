const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('hospital', hospitalSchema)