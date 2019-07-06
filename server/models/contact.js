const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    name :String,
    age : Number,
    gender:String,
    mnumber:Number

});

module.exports = mongoose.model('contact',contactSchema,'contacts');