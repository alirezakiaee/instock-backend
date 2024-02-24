const router = require("express").Router();
const inventoryController = require("../controllers/warehouse-controller");
const warehouseController = require("../controllers/warehouse-controller");

router.get("/warehouses", inventoryController.warehouseList);

// Route for the DELETE request
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);
module.exports = router;
