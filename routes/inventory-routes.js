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

// route to fetch inventory details with warehouse names
router.get('/inventories-warehouses/:id', inventoryController.inventoryDetails);


module.exports = router;

