const Contact = require('../models/contact');

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body },
      { new: true }
    );

    if (!updatedContact) {
      return null;
    }

    return updatedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
