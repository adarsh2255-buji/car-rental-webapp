import Booking from "../model/BookingModel.js";
import Car from "../model/carModel.js"
import User from "../model/userModel.js"


//function to calculate total price
const calculateTotalPrice = (pricePerDay, pickUpDateAndTime, dropOffDateAndTime) =>{
    const pickUpDate = new Date(pickUpDateAndTime);
    const dropOffDate = new Date(dropOffDateAndTime);
    const days = Math.ceil((dropOffDate - pickUpDate)/(1000 * 60 * 60 * 24));
    return days * pricePerDay;
}

//car booking function
export const carBooking = async (req, res) =>{
    try {
        const { 
            user,
            car,
            pickUpLocation,
            pickUpDateAndTime,
            dropOffLocation,
            dropOffDateAndTime } = req.body

            //car availablity
            const bookedCar = await Car.findById(car);
            if(!bookedCar){
                res.status(404).json({ message : "Car not found"})
            }

            if(!bookedCar.availability){
                res.status(404).json({ message : "Car is not available"})
            }

            //total price
            const totalPrice = calculateTotalPrice(bookedCar.pricePerDay, pickUpDateAndTime, dropOffDateAndTime)
            //create booking
            const booking = new Booking({
                user,
                car,
                pickUpLocation,
                pickUpDateAndTime,
                dropOffLocation,
                dropOffDateAndTime,
                totalPrice
    })

            await booking.save();

            //update car availability
            bookedCar.availability = false;
            await bookedCar.save()

            res.status(201).json({ message : "Car booked successfully", booking})
            
    } catch (error) {
        console.log(error)
        res.status(500).json({ message : "Server error", error})
    }
}

