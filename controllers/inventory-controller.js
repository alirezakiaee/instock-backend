const { response } = require('express');

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

module.exports = { inventoryList, deleteInventory };