const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");
const warehouseController = require("../controllers/warehouse-controller");

// Route for the DELETE request
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);

router.get("/inventories", inventoryController.inventoryList);

module.exports = router;
