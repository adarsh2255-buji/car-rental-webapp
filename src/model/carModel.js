import mongoose, { mongo, Schema } from 'mongoose';

const carSchema = mongoose.Schema({
    make : {type : String, required : true},
    model : {type : String, required : true},
    year : {type : Number, required : true},
    mileage : {type : Number, required : true},
    pricePerDay : {type : Number, required : true},
    location : {type : mongoose.Schema.Types.ObjectId, ref : 'Location'},
    availability : {type : Boolean, default : true},
}, { timestamps : true });

const Car = mongoose.model("Car", carSchema);
export default Car; 