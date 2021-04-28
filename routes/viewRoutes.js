const express =  require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');


router.get('/login', viewController.getLoginForm);
router.get('/', viewController.getMainPage);
module.exports =  router;