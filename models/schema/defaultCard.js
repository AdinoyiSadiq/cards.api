const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultCardSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String
});

module.exports = defaultCardSchema;