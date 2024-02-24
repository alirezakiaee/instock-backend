const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

// route to fetch all inventories
router.get('/inventories', inventoryController.inventoryList);

// route to fetch all inventories with warehouse names
router.get('/inventories-warehouses', inventoryController.inventoryWarehouseList);

module.exports = router;