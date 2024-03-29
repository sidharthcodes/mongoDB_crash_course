const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStratergy = require('passport-local').Strategy;
const User = require('./models/users');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const config = require('./config');

exports.local = passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
	return jwt.sign(user, config.secretKey, { expiresIn: 3600 });	//3600 seconds
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));


exports.verifyUser = passport.authenticate('jwt', {session: false});
exports.verifyAdmin = function(req, res, next){
	if(req.user.admin){
		next();
	}
	else{
		var err = new Error("You are not authorized to perform this operation!");
		err.status = 403;
		next(err);
	}
}