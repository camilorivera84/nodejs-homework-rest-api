const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts');
const { addContactSchema } = require('../../validationSchemas');

router.get('/', listContacts);
router.get('/:id', getContactById);
router.post('/', celebrate({ [Segments.BODY]: addContactSchema }), addContact);
router.delete('/:id', removeContact);
router.put('/:id', updateContact);

router.patch(
  '/:contactId/favorite',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      contactId: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      favorite: Joi.boolean().required(),
    }),
  }),
  async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    try {
      const updatedContact = await updateStatusContact(contactId, favorite);
      if (!updatedContact) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(updatedContact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
