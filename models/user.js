const mongoose = require('mongoose');
const defaultCardSchema = require('./schema/defaultCard');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
	facebookId: String,
	email: { type: String, unique: true, lowercase: true },
	password: String,
	defaultCard: defaultCardSchema,
	cards: [{
		type: Schema.Types.ObjectId,
		ref: 'card'
	}]
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
	// get access to the user model
	const user = this;

	if (user.password) {
		// generate a salt the run callback
		bcrypt.genSalt(10, function(err, salt) {
			if (err) { 
				return next(err); 
			}

			// hash (encrypt) our password using the salt
			bcrypt.hash(user.password, salt, null, function(err, hash) {
				if (err) { 
					return next(err); 
				}

				// overwrite plain text password with encrypted password
				user.password = hash;
				next();
			});
		});
	}
	
	next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
}

// Create the model class
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;

