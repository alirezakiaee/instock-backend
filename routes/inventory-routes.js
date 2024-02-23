const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

router.get('/inventories', inventoryController.inventoryList);

module.exports = router;