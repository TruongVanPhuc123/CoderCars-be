const { getAllCars, createCar, updateCar, deleteCar } = require("../controller/car.controller");
const express = require("express");
const router = express.Router();

//Create
router.post('/', createCar)
//Read
router.get('/', getAllCars)
//Update
router.put('/:id', updateCar)
//Delete
router.delete('/:id', deleteCar)

module.exports = router;