const bloodModel = require('../models/bloodModel')
const hospitalModel = require('../models/hospitalModel')

const addSample = async (req, res) => {
    try {

        const { bloodGroup, unitsAvailable } = req.body;
        const hospitalId = req.params.hospitalId;
        const hospital = await hospitalModel.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        const bloodSample = new bloodModel({
            hospitalId: hospital._id,
            bloodGroup,
            unitsAvailable,
        })
        await bloodSample.save();
        return res.status(201).send({ status: true, message: 'Blood sample added successfully', data: bloodSample })
    }

    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }

}

const getSample = async (req, res) => {
    try {
        let data = await bloodModel.find()
        return res.status(200).send({ status: true, message: "list of all blood samples available in all hospitals", data: data })
    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

// PUT endpoint to update a blood sample
const updateSample = async (req, res) => {
    try {
        const { bloodGroup, unitsAvailable } = req.body;

        // update the BloodSample object with the new information
        const bloodSample = await bloodModel.findByIdAndUpdate(req.params.id, {
            bloodGroup,
            unitsAvailable
        })

        res.status(200).json({ message: 'Blood sample updated successfully', data: bloodSample })
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


// DELETE endpoint to delete a blood sample
const deleteSample = async (req, res) => {
    try {
        // find and remove the BloodSample object with the given ID
        await bloodModel.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: 'Blood sample deleted successfully' });
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports = { addSample, getSample, updateSample, deleteSample }