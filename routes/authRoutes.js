const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false});
const requireFbSignin = passport.authenticate('facebook', { scope : ['email'] });
const requireFbCallback = passport.authenticate('facebook', { session: false });

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is ABC123' });
	});

	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

	app.get('/auth/facebook', requireFbSignin);
	app.get('/auth/facebook/callback', requireFbCallback, Authentication.facebookSignin);
}