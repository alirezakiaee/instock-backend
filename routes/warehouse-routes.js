const router = require("express").Router();
const warehousesController = require("../controllers/warehouse-controller");

router.get("/warehouses", warehousesController.warehouseList);
router.post("/warehouses", warehousesController.newWarehouse);

module.exports = router;
