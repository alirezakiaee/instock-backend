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

const deleteInventory = (req, res) => {
    const inventoryId = req.params.id;

    knex('inventories')
    .where('id', inventoryId)
    .del()
    .then(data => {
        res.status(200).json({ message: `Inventory with id ${inventoryId} deleted` });
    })
    .catch(err => {
        res.status(404).json({ message: `Error: ${err}` });
    });
}

module.exports = { inventoryList, deleteInventory };