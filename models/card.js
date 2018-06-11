const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	title: String,
	_user: { type: Schema.Types.ObjectId, ref: 'user' },
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}]
});

cardSchema.pre('remove', function(next) {
	const User = mongoose.model('user');

	User.update({ _id: this._user }, { $pull: { cards: { $in: [this._id] }}})
		.then(() => next());
});

const Card = mongoose.model('card', cardSchema)

module.exports = Card;