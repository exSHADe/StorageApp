const router = require('express').Router();
const roomController = require('../controllers/roomController');
router.post('/create',roomController.create);
router.get('/:id',roomController.read);
router.get('/',roomController.readAny);
router.put('/:id',roomController.update);
router.delete('/:id',roomController.delete);
module.exports = router