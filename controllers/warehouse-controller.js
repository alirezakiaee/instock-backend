const knex = require("knex")(require("../knexfile"));
const warehouseList = (req, res) => {
  knex("warehouses")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: `Error: ${err}` });
    });
};

// Function to delete warehouse and associated inventory items
const deleteWarehouse = (req, res) => {
  const warehouseId = req.params.id;
  // Start a transaction using Knex
  knex
    .transaction(async (trx) => {
      try {
        // Step 1: Delete inventory items associated with the warehouse
        const inventoryDeleted = await trx("inventories")
          .where("warehouse_id", warehouseId)
          .del();

        // Step 2: Delete the warehouse itself
        const warehouseDeleted = await trx("warehouses")
          .where("id", warehouseId)
          .del();

        // If the warehouse is not found
        if (!warehouseDeleted) {
          return res.status(404).end();
        }

        // If delete is successful
        return res.status(204).end();
      } catch (error) {
        // If there is an error, roll back the transaction
        trx.rollback;
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    })
    .catch((err) => {
      // handle error if the transaction fails and is rolled back
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

const newWarehouse = (req, res) => {
  knex("warehouses")
    .insert(req.body)
    .then((ids) => {
      insertedId = ids[0];
      return knex("warehouses").where("id", insertedId).first();
    })
    .then((result) => {
      res.json(result).status(201);
    })
    .catch((error) => {
      res.json(error);
    });
};

const editWarehouse = async (req, res) => {
  let warehouseId = req.params.id;
  let {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;
  try {
    let updated = await knex("warehouses").where("id", warehouseId).update({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

    if (!updated) {
      return res.status(404).json({ message: `Warehouse not found` });
    }

    const updatedWarehouse = await knex("warehouses")
      .where("id", warehouseId)
      .first();
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ message: `Error updating warehouse:${error}` });
  }
};
module.exports = {
  warehouseList,
  newWarehouse,
  deleteWarehouse,
  editWarehouse,
};
