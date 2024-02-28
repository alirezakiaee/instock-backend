const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");


// POST route to add a new inventory item
router.post("/inventories", inventoryController.addInventoryItem);

// route to fetch all inventories
router.get('/inventories', inventoryController.inventoryList);


// route to fetch all inventories with warehouse names
router.get('/inventories-warehouses', inventoryController.inventoryWarehouseList);

router.get('/warehouses/:id/inventories', inventoryController.inventoryByWarehouseId);

router.delete('/inventories/:id', inventoryController.deleteInventory);

// POST route to add a new inventory item
router.post("/inventories", inventoryController.addInventoryItem);
// PUT route to edit an inventory item
router.put("/inventories/:id", inventoryController.editInventoryItem);

module.exports = router;

