const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());


app.use('/', express.static(path.join(__dirname, 'public/static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    if (!req.cookies.token) {
        return res.redirect("/login");
    }
    jwt.verify(req.cookies.token, "xco0sr0fh4e52x03g9mv", (err, decoded) => {
        if (err) {
            console.error(err);
            return res.redirect("/login");
        }
        next();
    });
}

app.get("/health", (req, res) => res.sendStatus(200));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, "public/login.html")));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, "public/signup.html")));

app.post('/login', (req, res) => {
    axios.post(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/users/${req.body.username}`, {
        user_name: req.body.username,
        user_password: req.body.password
    })
    .then(response => {
        res.writeHead(302, {
            "Set-Cookie": `token=${response.data.JWT}; HttpOnly`,
            "Access-Control-Allow-Credentials": "true",
            "Location": "/"
        }).end();
    })
    .catch(error => {
        console.error(error);
        res.redirect("/login?error=invalidcreds");
    });
});

app.post("/signup", (req, res) => {
    axios.post(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/users/`, {
        user_name: req.body.username,
        user_password: req.body.password
    })
    .then(() => res.redirect("/login"))
    .catch(error => {
        console.error(error);
        res.redirect('/signup?error=userexists');
    });
});

app.get('/', authenticateToken, (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.get("/logout", (req, res) => {
    res.writeHead(302, {
        "Set-Cookie": "token=; HttpOnly; path=/; max-age=0",
        "Location": "/login"
    }).end();
});

app.get("/weather/:city", (req, res) => {
    axios.get(`http://${process.env.WEATHER_HOST}:${process.env.WEATHER_PORT}/weather/${req.params.city}`)
        .then(response => res.json(response.data))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch weather data" });
        });
});

app.listen(port, () => console.log(`Weather app listening at http://localhost:${port}`));

