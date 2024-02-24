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

module.exports = { inventoryList, addInventoryItem };