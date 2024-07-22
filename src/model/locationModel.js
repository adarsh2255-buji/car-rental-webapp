import mongoose from 'mongoose';

const locationSchema =  mongoose.Schema({
    name : { type : String, required : true},
    address : { type : String, required : true},
    city : { type : String, required : true},
    state : { type : String, required : true},
    zipCode : { type : String, required : true},
}, { timeStamps : true})

const Location = mongoose.model('Location', locationSchema);
export default Location;