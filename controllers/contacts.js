const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const path = require('path');

const pathContacts = path.join(__dirname, '../models/contacts.json');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const loadContacts = async () => {
  try {
    const result = (await fs.readFile(pathContacts)).toString();
    return JSON.parse(result);
  } catch (error) {
    console.error('Error reading JSON data:', error);
  }
};

const listContacts = loadContacts;

const getContactById = async (contactId) => {
  try {
    const contacts = await loadContacts();
    // const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    throw new Error('Error reading contacts file');
  }
};

const addContact = async (body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new Error('Validation error: ' + error.message);
  }

  try {
    const contacts = await loadContacts();

    const newContact = {
      id: uuidv4(),
      ...body,
    };

    contacts.push(newContact);

    await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error('Error writing to contacts file');
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await loadContacts();
    const updatedContacts = contacts.filter((c) => c.id !== contactId);

    if (updatedContacts.length === contacts.length) {
      throw new Error('Contact not found');
    }

    await fs.writeFile(pathContacts, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    throw new Error('Error writing to contacts file');
  }
};

const updateContact = async (contactId, body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new Error('Validation error: ' + error.message);
  }

  try {
    const contacts = await loadContacts();

    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      throw new Error('Contact not found');
    }

    contacts[index] = {
      ...contacts[index],
      ...body,
    };

    await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    throw new Error('Error writing to contacts file');
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
