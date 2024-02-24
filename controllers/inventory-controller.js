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

// Query to get all inventories with warehouse names
const inventoryWarehouseList = (req, res) => {
    knex('inventories')
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .select('inventories.*', 'warehouses.warehouse_name as warehouse_name') // Adjust the columns as needed
    .then(inventories => {
        res.status(200).json(inventories);
    })
    .catch(error => {
        res.status(404).json({ message: `Error: ${err}` });
    });
}

module.exports = {  inventoryList , inventoryWarehouseList };