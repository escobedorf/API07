const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuario.controller');

router.get('/',userController.getAllUsers);
router.get('/:correo',userController.getUsersByEmail);
router.post('/',userController.addUser);
router.put('/:correo',userController.updateUser);
router.delete('/:correo',userController.deleteUser);

module.exports = router







