const express = require('express');
const router = express.Router();
const { updateStatusContact } = require('../../controllers/contacts');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contacts');

router.get('/', listContacts);
router.get('/:id', getContactById);
router.post('/', addContact);
router.delete('/:id', removeContact);
router.put('/:id', updateContact);

router.patch('/:contactId/favorite', async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite === 'undefined') {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, favorite);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
