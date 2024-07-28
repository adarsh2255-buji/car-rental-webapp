import Car from "../model/carModel.js";

//CREATE CAR
export const createCar = async (req, res) =>{
    try {
        const { make,
            model,
            image, 
            fuelType,
            gearTransmission,
            allowedKM, 
            kmPerDay, 
            seater, 
            pricePerDay, 
        } = req.body;
        // const image = req.file.path;

        const car = new Car({
            make,
            model,
            fuelType,
            image,
            gearTransmission,
            allowedKM,
            kmPerDay,
            seater,
            pricePerDay,
            availability : true
        })

        await car.save();
        res.status(201).json({ message : 'Car created successfully', car})
        return;
    } catch (error) {
        res.status(500).json({ message : "Server error", error})
    }
}

// GET CAR BY ID
export const getCarById = async(req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if(!car) {
            return res.status(404).json({ message : "Car not found"})
        }
        res.status(200).json(car)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
} 