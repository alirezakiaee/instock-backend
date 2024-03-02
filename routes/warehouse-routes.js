const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

// Route for the DELETE request
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);

router.get("/warehouses", warehouseController.warehouseList);

router.post("/warehouses", warehouseController.newWarehouse);

router.put("/warehouses/:id", warehouseController.editWarehouse);

module.exports = router;
