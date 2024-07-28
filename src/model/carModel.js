import mongoose, { mongo, Schema } from 'mongoose';

const carSchema = mongoose.Schema({
    make : {type : String, required : true},
    model : {type : String, required : true},
    fuelType : {type : String, required : true},
    gearTransmission : {type : String, required : true},
    allowedKM : {type : Number, required : true},
    kmPerDay : {type : Number, required : true},
    seater : {type : Number, required : true},
    image : {type : String, required : true},
    pricePerDay : {type : Number, required : true},
    availability : {type : Boolean, default : true},
}, { timestamps : true });

const Car = mongoose.model("Car", carSchema);
export default Car; 