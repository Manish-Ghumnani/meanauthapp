const JwtStrategy = require("passport-jwt").Strategy;
const ExtractStrategy = require("passport-jwt").ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    //we are extracting the token from the auth header
    opts.jwtFromRequest = ExtractStrategy.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload._id, (err, user) => {
            console.log(jwt_payload);
            if(err){
                return done(err,false);
            }
            
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));
}