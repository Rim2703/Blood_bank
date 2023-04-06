const express = require('express')
const router = express.Router()
const hospitalController = require('../controlllers/hospitalController')
const bloodController = require('../controlllers/bloodController')
const receiverController = require('../controlllers/receiverController')
const middleware = require('../middleware/auth')

router.post('/hospitals', hospitalController.hospital)
router.post('/login', hospitalController.login)
router.post('/blood-samples/:hospitalId', middleware.authenticate, bloodController.addSample)
router.post('/receiver', receiverController.addReceiver)
router.post('/signIn', receiverController.signIn)
router.get('/hospital/blood-samples', bloodController.getSample)
router.put('/blood-samples/:id', middleware.authenticate, bloodController.updateSample)
router.delete('/blood-samples/:id', middleware.authenticate, bloodController.deleteSample)
router.get('/blood-samples/:id', middleware.authenticate, hospitalController.getSampleById)
router.get('/receivers/:bloodGroup', receiverController.getAllReceiverbyGroup)

module.exports = router;