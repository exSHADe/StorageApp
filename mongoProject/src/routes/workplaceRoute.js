const router = require('express').Router();
const workplaceController = require('../controllers/workplaceController');
router.post('/create',workplaceController.create);
router.get('/:id',workplaceController.read);
router.get('/',workplaceController.readAny);
router.put('/:id',workplaceController.update);
router.delete('/:id',workplaceController.delete);
module.exports = router