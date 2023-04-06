const receiverModel = require('../models/receiverModel')
const hospitalModel = require('../models/hospitalModel')
const bcrypt = require('bcrypt')

const addReceiver = async (req, res) => {
    try {
        const data = req.body

        const { name, email, password, address, phone, bloodGroup } = data

        const existingUser = await receiverModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createReceiver = new receiverModel({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
            bloodGroup
        })
        await createReceiver.save();

        return res.status(201).send({ status: true, data: createReceiver })

    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

const signIn = async (req, res) => {
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

const getAllReceiverbyGroup = async (req, res) => {
    try {
        const bloodGroup = req.params.bloodGroup

        const receivers = await receiverModel.find({ bloodGroup })

        return res.status(200).send({ status: true, data: receivers })
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports = { addReceiver, signIn, getAllReceiverbyGroup }