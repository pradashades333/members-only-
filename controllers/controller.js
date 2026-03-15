const pool = require("../db/pool");
const passport = require("../db/passport")
const bcrypt = require("bcryptjs")

module.exports = {
    index: async (req, res, next) => {
        try{
        const {rows} = await pool.query("SELECT * FROM message")
        res.render("message/index", {messages:rows})
        } catch(err){
            next(err)
        }
    },

    signUpGet: async (req,res) => {
        res.render("auth/sign-up")
    },

    signUpPost: async(req,res) => {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query(`INSERT INTO "user" (first_name, last_name, email, password) VALUES ($1,$2,$3,$4)`, [first_name, last_name, email, hashedPassword])
        res.redirect("/log-in")
    }

}