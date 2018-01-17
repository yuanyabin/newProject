const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const config = require('./config');
const User = require('./models/users');

// token 验证
module.exports = function(passport) {
    passport.use(new BearerStrategy(
        function(token, done) {
            User.findOne({
                token: token
            }, function(err, user) {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null, false);
                }
                return done(null, user, { scope: 'read' });
            }
        );
        }
    ));
};
