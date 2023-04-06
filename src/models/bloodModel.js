const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bloodSampleSchema = new mongoose.Schema({
    hospitalId: {
        type: ObjectId,
        ref: 'hospital',
        required: true
      },
    bloodGroup: { type: String, required: true },
    unitsAvailable: { type: Number, required: true },
});

module.exports = mongoose.model('bloodSample', bloodSampleSchema)
