const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

router.get("/inventories", inventoryController.inventoryList);

// POST route to add a new inventory item
router.post("/inventories", inventoryController.addInventoryItem);

module.exports = router;
