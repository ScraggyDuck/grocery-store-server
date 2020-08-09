const express = require('express');
const viewController = require('../controllers/view.controller');

const router = express.Router();

router.get('/', viewController.getHome);

module.exports = router;
