const router = require('express').Router();
const inventoryController = require('../controllers/warehouse-controller');

// route to fetch all warehouses
router.get('/warehouses', inventoryController.warehouseList);

module.exports = router;