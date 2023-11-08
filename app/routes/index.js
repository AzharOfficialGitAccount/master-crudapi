const router = require('express').Router();
const controller = require('../controller/user');
const schema = require('../validation/user');
const { reqValidator } = require('../middleware/requestValidator');

// =========================================USER LOGIN SECTION ==========================================

router.post('/create-user', reqValidator(schema.createUser), controller.createUser);
router.get('/single-user', reqValidator(schema.getUserById, 'query'), controller.getUserById);
router.put('/update-user', reqValidator(schema.updateUser), controller.updateUser);
router.delete('/delete-user', reqValidator(schema.deleteUser), controller.deleteUser);
router.get('/all-users', controller.getAllUsers);
router.get('/export-chat-to-excel', controller.exportChatToExcel);

// =========================================END SECTION ==========================================

module.exports = router;
