const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config');

const JwtStrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = mongoose.model('user');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	// Verify this email and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false);
		}

		if (!user.password) {
			return done(null, false);
		}
		
		// compare passwords - is `password` equal to user password?
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				return done(null, false);
			}

			return done(null, user);
		});
	});
});

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that user
	// otherwise, call done without a user object
	User.findById(payload.sub, function(err, user) {
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user)
		} else {
			done(null, false)
		}
	});
});

const facebookLogin = new FacebookStrategy({
		clientID: config.facebookClientID,
		clientSecret: config.facebookClientSecret,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'email', 'first_name', 'gender', 'last_name']
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ facebookId: profile.id })
			.then((existingUser) => {
				if (existingUser) {
					// we already have a record with the given profile ID
					done(null, existingUser);
				} else {
					// we don't have a user record with this ID, make a new record!
					const {name, emails, id } = profile;

					new User({ 
						facebookId: id, 
						email: emails[0].value,
						defaultCard: {
							firstName: name.givenName,
							lastName: name.familyName,
							email: emails[0].value
						} 
					})
						.save()
						.then(user => done(null, user));
				}
			});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);
