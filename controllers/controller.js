const pool = require("../db/pool");
const passport = require("../db/passport")
const bcrypt = require("bcryptjs")

module.exports = {
    index: async (req, res, next) => {
        try{
        const {rows} = await pool.query("SELECT * FROM message")
        res.render("index", {messages:rows})
        } catch(err){
            next(err)
        }
    },

    signUpGet: async (req,res) => {
        res.render("auth/sign-up")
    },

    signUpPost: async(req,res, next) => {
        try {
            const { first_name, last_name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)
            await pool.query(`INSERT INTO "user" (first_name, last_name, email, password) VALUES ($1,$2,$3,$4)`, [first_name, last_name, email, hashedPassword])
            res.redirect("/log-in")
        } catch (err) {
            next(err)
        }
    },

    logInGet: async(req,res) => {
        res.render("auth/log-in")
    },

    logInPost: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
    }),

    logOut:async (req,res, next) => {
        req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
        });
    },

    joinClubGet: async (req,res) => {
        res.render("auth/passcode")
    },

    joinClubPost: async (req, res, next) => {
        try {
            const { passcode } = req.body;
            if (passcode === "secret123") {
                await pool.query(`UPDATE "user" SET membership_status = true WHERE id = $1`, [req.user.id]);
            }
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    },

    newMessageGet: async (req,res) => {
        res.render("/message")
    },

    newMessagePost: async (req,res, next) => {
        try {
            const { title, text } = req.body;
            await pool.query("INSERT INTO message (title, text, user_id) VALUES ($1, $2, $3)", [title, text, req.user.id])
            res.redirect("/")
        } catch (err) {
            next(err)
        }
    },

    deleteMessage: async (req, res, next) => {
        try {
            await pool.query("DELETE FROM message WHERE id = $1", [req.params.id]);
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    }
}