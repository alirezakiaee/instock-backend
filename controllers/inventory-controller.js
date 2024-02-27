const knex = require('knex')(require('../knexfile'));

const inventoryList = (req, res) => {
    knex('inventories')
        .select('*')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json({ message: `Error: ${err}` });
        });
};

const addInventoryItem = async (req, res) => {
    const { warehouse_id, item_name, description, category, status, quantity } = req.body;

    if (!warehouse_id || !item_name || !description || !category || !status || quantity === undefined) {
    return res.status(400).json({ message: 'All values are required and must be non-empty' });
}

    if (isNaN(Number(quantity))) {
        return res.status(400).json({ message: 'Quantity must be a number' });
    }

    try {
        const warehouseExists = await knex('warehouses').where('id', warehouse_id).first();
        if (!warehouseExists) {
            return res.status(400).json({ message: 'warehouse_id value does not exist in the warehouses table' });
        }

        const [createdItemId] = await knex('inventories').insert({
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity: Number(quantity)
        }).returning('id');

        const newItem = await knex('inventories').where('id', createdItemId).first();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating inventory:', error);
        res.status(500).send('Internal Server Error');
    }
};

const inventoryByWarehouseId = (req,res)=> {
    const warehouseId = req.params.id;

    knex('inventories')
    .select('item_name', 'category', 'status', 'quantity')
    .where('warehouse_id', warehouseId)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({ message: `Error: ${err}` });
    });
}

const deleteInventory = async (req, res) => {
    const inventoryId = req.params.id;

    try {
        const data = await knex('inventories').where('id', inventoryId).first();

        if (!data) {
            return res.status(404).json({ message: `Inventory with id ${inventoryId} does not exist` });
        }

        await knex('inventories').where('id', inventoryId).del();
        return res.status(200).json({ message: `Inventory with id ${inventoryId} deleted` });
    }
    catch (error) {
        return res.status(500).json({ message: `Error deleting inventory: ${error}` });
    }
}


// Query to get all inventories with warehouse names
const inventoryWarehouseList = (req, res) => {
    knex('inventories')
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .select('inventories.*', 'warehouses.warehouse_name as warehouse_name') // Adjust the columns as needed
    .then(inventories => {
        res.status(200).json(inventories);
    })
    .catch(error => {
        res.status(404).json({ message: `Error getting the list` });
    });
}

// GET inventory details with warehouse names
const inventoryDetails = (req, res) => {

    const inventoryId = req.params.id;

    knex('inventories')
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .where('inventories.id', inventoryId)
    .select('inventories.*', 'warehouses.warehouse_name as warehouse_name')
    .then(inventoryDetail => {
        res.status(200).json(inventoryDetail);
    })
    .catch(error => {
        res.status(404).json({ message: `Error getting the inventory details` });
    });
}

module.exports = {  inventoryList , inventoryWarehouseList , deleteInventory , inventoryByWarehouseId , addInventoryItem, inventoryDetails};

