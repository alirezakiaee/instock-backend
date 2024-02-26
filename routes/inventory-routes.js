const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

router.get('/inventories', inventoryController.inventoryList);

router.get('/warehouses/:id/inventories', inventoryController.inventoryByWarehouseId);

module.exports = router;