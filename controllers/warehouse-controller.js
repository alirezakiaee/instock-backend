const { response } = require('express');

const knex = require('knex')(require('../knexfile'));

//Query to get all warehouses 
const warehouseList = (req,res)=> {
    knex('warehouses')
    .select('*')
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({ message: `Error: ${err}` });
    });
};

module.exports = {  warehouseList};