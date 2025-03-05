const EmergencyContact = require('../models/EmergencyContact');

// Add Emergency Contact
exports.addContact = async (req, res) => {
    try {
        const { name, phone, relationship } = req.body;
        const contact = new EmergencyContact({
            user: req.user.id,
            name,
            phone,
            relationship
        });
        await contact.save();
        res.status(201).json({ message: 'Emergency contact added', contact });
    } catch (error) {
        res.status(500).json({ message: 'Error adding contact', error });
    }
};

// Get Emergency Contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await EmergencyContact.find({ user: req.user.id });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};

// Delete Emergency Contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await EmergencyContact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Ensure user is authorized to delete their own contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this contact' });
        }

        await contact.deleteOne();
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
};

