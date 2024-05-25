const fs = require('fs');
const csv = require('csvtojson');
const Car = require('./model/Car');
const { default: mongoose } = require('mongoose');
require("dotenv").config();

const mongodbURL = process.env.MONGODB_URI

mongoose
    .connect(mongodbURL)
    .then(() => console.log(`Connected to ${mongodbURL}`))
    .catch((err) => console.log(err))

const creatCars = async () => {
    const data = await csv().fromFile('data.csv');

    newData = data.map((car) => {
        return {
            make: car.Make,
            model: car.Model,
            style: car["Vehicle Style"],
            size: car["Vehicle Size"],
            transmission_type: car["Transmission Type"],
            price: Number((Math.random() * 100).toFixed(3)),
            release_date: Number(car.Year),
        }
    })


    await Car.create(newData);
    console.log("done")
}

creatCars()