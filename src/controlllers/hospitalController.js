const hospitalModel = require('../models/hospitalModel')
const bloodModel = require('../models/bloodModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hospital = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body

        const existingUser = await hospitalModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new hospital document
        const hospital = new hospitalModel({
            name,
            email,
            password: hashedPassword,
            address,
            phone
        });

        await hospital.save();

        // Generate JWT token
        const token = jwt.sign({ userId: hospital._id }, 'secret_key');
        return res.status(201).send({ status: true, data: { token, hospital } })

    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await hospitalModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const passwordMatches = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatches) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        return res.status(200).send({ message: 'Login successful' });
    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


// GET endpoint to get all the blood info that the hospital uploaded
const getSampleById = async (req, res) => {
    try {
        // Find the blood samples by the hospital id
        const bloodSamples = await bloodModel.find({ hospitalId: req.params.id });

        res.status(200).send({ status: true, data: bloodSamples })
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports = { hospital, login, getSampleById }