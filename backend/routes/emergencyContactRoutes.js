const express = require('express');
const router = express.Router();
const { addContact, getContacts, deleteContact } = require('../controllers/emergencyContactController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addContact);
router.get('/', authMiddleware, getContacts);
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;
