const ContactController = require('./controllers/ContactController');
const CategoryController = require('./controllers/CategoryController');

const { Router } = require('express');
const router = Router();

const validateUUID = require('./middlewares/validateUUID');

const homePage ={
    sucess: true,
    acessContacts: 'http://localhost:3001/contacts',
    acessCategories: 'http://localhost:3001/categories'
}

router.get('/', (req, res) => res.json(homePage));
router.get('/contacts', ContactController.index);
router.post('/contacts', ContactController.store);
router.get('/contacts/:id', validateUUID('params', 'id'), ContactController.show);
router.put('/contacts/:id', validateUUID('params', 'id'), validateUUID('body', 'category_id'), ContactController.update);
router.delete('/contacts/:id', validateUUID('params', 'id'), ContactController.delete);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.get('/categories/:id', validateUUID('params', 'id'), CategoryController.show);
router.put('/categories/:id', validateUUID('params', 'id'), validateUUID('body', 'category_id'), CategoryController.update);
router.delete('/categories/:id', validateUUID('params', 'id'), CategoryController.delete);

module.exports = router;