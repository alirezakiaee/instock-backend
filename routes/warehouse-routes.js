const router = require('express').Router();
const inventoryController = require('../controllers/warehouse-controller');

router.get('/warehouses', inventoryController.warehouseList);

module.exports = router;