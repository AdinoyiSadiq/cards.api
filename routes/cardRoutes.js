const Cards = require('../controllers/cards');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
	app.post('/api/cards', requireAuth, Cards.create);
	app.put('/api/cards/:id', requireAuth, Cards.edit);
	app.delete('/api/cards/:id', requireAuth, Cards.delete);
	app.get('/api/cards/index', requireAuth, Cards.index);
}