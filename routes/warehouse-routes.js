const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

// Route for the DELETE request
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);

router.get("/warehouses", warehousesController.warehouseList);

router.post("/warehouses", warehousesController.newWarehouse);

module.exports = router;
