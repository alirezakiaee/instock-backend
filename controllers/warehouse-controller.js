const { response } = require("express");


const knex = require('knex')(require('../knexfile'));

//Query to get all warehouses 
const warehouseList = (req,res)=> {
    knex('warehouses')
    .select('*')
    .then(data => {
        res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: `Error: ${err}` });
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

module.exports = { warehouseList, newWarehouse };
