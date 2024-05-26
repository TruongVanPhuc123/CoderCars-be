const { sendResponse } = require("../utils/utils")

const Car = require("../model/Car")

const carController = {}

carController.createCar = async (req, res, next) => {
    const { body } = req

    const data = {
        make: body.make,
        model: body.model,
        style: body.style,
        size: body.size,
        transmission_type: body.transmission_type,
        price: body.price,
        release_date: body.release_date,
    }
    const created = await Car.create(data)
    console.log(data, "done")
    res.status(200).send(created)
}

//Read
carController.getAllCars = async (req, res, next) => {
    try {
        const { query } = req
        const page = query.page
        let limit = 10;

        // if (page < 0) {
        //     const error = new Error("Page must be greater than zero")
        //     error.statusCode = 401
        //     error.isOperational = true;
        //     error.errorType = "User Error"
        //     throw error
        // }

        const filter = {}
        let elements = await Car.find(filter).limit(limit).skip(limit * (page - 1))
        let totalElements = await Car.countDocuments()
        let totalPages = Math.ceil(totalElements / limit)
        const respone = { data: { cars: elements, total: totalPages } }
        res.status(200).send(respone)

    } catch (error) {
        next(error)
    }
}

carController.updateCar = async (req, res, next) => {
    const { body, params } = req

    const id = params.id
    const data = {
        make: body.make,
        model: body.model,
        style: body.style,
        size: body.size,
        transmission_type: body.transmission_type,
        price: body.price,
        release_date: body.release_date,
    }

    let newCar = await Car.findByIdAndUpdate(id, data, { new: true })
    res.status(200).send(newCar)
}

carController.deleteCar = async (req, res, next) => {
    const { params } = req
    const id = params.id

    await Car.findByIdAndDelete(id)
    res.send("complete delete !")
    console.log(id, "done deleting")
}

module.exports = carController;