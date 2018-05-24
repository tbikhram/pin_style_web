//conntecting to mongoose and schemma
//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//this will the data table that is created with mongoose
var PinSchema = new Schema({
	title: String,
	desc: String,
	username: String,
	path: String,
	isSave: Boolean
})

module.exports = mongoose.model('Pin', PinSchema);