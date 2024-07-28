import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user : { type : mongoose.Schema.ObjectId, ref : 'User', required : true },
    car : { type : mongoose.Schema.ObjectId, ref : 'Car', required : true },
    pickUpLocation : { type :String, required : true },
    pickUpDateAndTime : { type : Date, required : true },
    dropOffLocation : { type : String, required : true },
    dropOffDateAndTime : { type : Date, required : true },
    totalPrice : { type : Number, required : true },
    status : {type : String, default : 'Booked'},
}, { timeStamps : true});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking; 