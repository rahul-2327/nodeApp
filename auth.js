// // authentication function or authentication middleware
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const checkUser = await Person.findOne({ username });
      console.log(checkUser);
      if (!checkUser) {
        return done(null, false, { message: "incorrect username" });
      }
      // const isMatchPwd = await (checkUser.password === password) ? true : false;
      const isMatchPwd = await checkUser.comparePassword(password);
      // const isMatchPwd = await bcrypt.compare(password, checkUser.password);
      if (isMatchPwd) {
        return done(null, checkUser);
      } else {
        return done(null, false, { message: "incorrect password" });
      }
    } catch (err) {
      console.log("catch error: ", err);
      return done(err);
    }
  })
);

module.exports = passport;
