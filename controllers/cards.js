const Card = require('../models/card');
const User = require('../models/user');

exports.create = async (req, res, next)  => {
	const { title } = req.body;

	const card = new Card({
		title: title,
		_user: req.user.id
	})

	req.user.cards.push(card)

	try {
		await card.save();
		const user = await req.user.save();

		res.send(user)
	} catch(err) {
		res.status(422).send({ error: err._message });
	}
};

exports.edit = function(req, res, next) {
	const cardId = req.params.id
	const { title } = req.body;

	Card.findByIdAndUpdate(cardId, { title: title })
		.then(() => Card.findById({ _id: cardId }))
		.then(card => res.send(card))
		.catch(next)
};

exports.delete = function(req, res, next) {
	const cardId = req.params.id;

	Card.findOne({ _id: cardId })
		.then((card) => card.remove())
		.then((card) => res.status(204).send({ message: 'successfully deleted card' }))
		.catch(next);
};

exports.index = function(req, res, next) {
	User.findOne({ _id: req.user.id })
		.populate('cards')
		.then((user) => res.send(user.cards))
		.catch(next);
};