const router = require('express').Router();
const controller = require('../controller/user');
const schema = require('../validation/user');
const { reqValidator } = require('../middleware/requestValidator');

// =========================================USER LOGIN SECTION ==========================================

router.post('/create-user', reqValidator(schema.createUser), controller.createUser);
// router.get('/all-users', reqValidator(schema.getAllUsers), controller.getAllUsers);
// router.get('/single-user', reqValidator(schema.getUserById), controller.getUserById);
// router.put('/update-user', reqValidator(schema.updateUser), controller.updateUser);
// router.delete('/delete-user', reqValidator(schema.deleteUser), controller.deleteUser);

// =========================================END SECTION ==========================================

module.exports = router;
