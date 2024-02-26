const { response } = require('express');

const knex = require('knex')(require('../knexfile'));
const inventoryList = (req,res)=> {
    knex('inventories')
    .select('*')
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({ message: `Error: ${err}` });
    });
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

module.exports = { inventoryList, inventoryByWarehouseId };