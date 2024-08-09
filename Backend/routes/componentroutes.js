const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { createComponent, getAllComponents, getSingleComponent, componentQrIdentifire, updateComponent, deleteComponent, updateComponentQrIdentifire } = require('../controllers/componentsController');


// Create a new component
router.post('/',  createComponent);

// // Get all components
router.get('/', getAllComponents);

// // Get a single component by QR identifier
router.get('/:id',verifyToken, getSingleComponent);

// get a single component with qr_scannerid
router.get('/scanner/:qr_identifier',verifyToken, componentQrIdentifire);

// // Update a component by qr_scannerid
router.put('/update/:id',verifyToken, updateComponentQrIdentifire);

// // Update a component by QR identifier
router.put('/updateWithId/:id',verifyToken, updateComponent);

// // Delete a component by id
router.delete('/:id',verifyToken, deleteComponent);

module.exports = router;
