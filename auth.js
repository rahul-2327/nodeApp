// // authentication function or authentication middleware
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");

const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (user, password, done) => {
    try {
      const checkUser = await Person.findOne({  user });
      if (!checkUser) {
        return done(null, false, { message: "incorrect username" });
      }
      const isMatchPwd = (checkUser.password == password) ? true : false;
      // const isMatchPwd = await bcrypt.compare(password, checkUser.password);
      if (!isMatchPwd) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, checkUser);
    } catch (err) {
      return done(err);
    }
  })
);


module.exports = passport;