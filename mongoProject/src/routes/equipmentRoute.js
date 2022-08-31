const router = require('express').Router();
const equipmentController = require('../controllers/equipmentController');
router.post('/create',equipmentController.create);
router.get('/:id',equipmentController.read);
router.get('/',equipmentController.readAny);
router.put('/:id',equipmentController.update);
router.delete('/:id',equipmentController.delete);
module.exports = router
