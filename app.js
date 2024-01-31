import { config } from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
config();

const app = express();
const port = 3000;
const salt_round = 10;

console.log(process.env.USER)

const db = new pg.Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});
db.connect();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login-page.ejs")
});

app.get("/register", (req, res) => {
    res.render("register-page.ejs")
});


app.post("/", async (req, res) => {
    const email = req.body["email"];
    try {
        const result = await db.query(
            "SELECT email FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length > 0) {
            res.render("login2-page.ejs", { email : email });
        } else {
            res.render("login-page.ejs", { message : "Incorrect email."})
        }
    } catch (error) {
        console.log(error);
    }
});

app.post("/login-confirm", async (req, res) => {

    const email = req.body["email"];
    const password = req.body["password"];

    try {
        const result_last_check = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (result_last_check.rows.length > 0) {
            const hashed_password = result_last_check.rows[0].password;
            bcrypt.compare(password, hashed_password, async (err, check_pass) => {
                if (err) {
                    console.error("Error comparing passwords : ", err);
                } else {
                    if (check_pass) {
                        const query_info = await db.query(
                            "SELECT * FROM description WHERE email = $1",
                            [email]
                        );
                        const info = query_info.rows[0]
                        res.render("homepage.ejs",{
                            user : info.name,
                            email : info.email,
                            hobby : info.hobby
                        });
                    } else {
                        res.render("login2-page.ejs", { incorrect : "Incorrect password", email : email })
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
});

app.post("/register", async (req, res) => {
    const email = req.body["email"];
    const password = req.body["password"];
    const name_user = req.body["name"];
    const hobby = req.body["hobby"];

    try {
        const check_user = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (check_user.rows.length > 0) {
            res.render("register-page.ejs", { message : "Already have email." })
        } else {
            bcrypt.hash(password, salt_round, async (err, hash) => {
                if (err) {
                    console.log("Error hashing password : " + err);
                } else {
                    const create_users = await db.query(
                        "INSERT INTO users (email, password) VALUES ($1, $2)",
                        [email, hash]
                    );
                    const create_description = await db.query(
                        "INSERT INTO description (email, name, hobby) VALUES ($1, $2, $3)",
                        [email, name_user, hobby]
                    );
                    res.render("homepage.ejs", {
                        user : name_user,
                        email : email,
                        hobby : hobby
                    });
                }
            })
        }
    } catch (error) {
        
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});