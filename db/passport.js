const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const {rows} = await pool.query(`SELECT * FROM "user" WHERE email = $1`, [email])

        if (!rows[0]){
            return(done(null, false))
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return(done(null, false))
        } else{
            return(done(null, user))
        }
    } catch (err) {
        return done(err);
    }
}));


module.exports = passport;