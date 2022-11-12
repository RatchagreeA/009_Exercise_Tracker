const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const logSchema = new mongoose.Schema({
    description: String,
    duration: Number,
    date: String,
});
const userSchema = new mongoose.Schema({
    username: String,
    count: { type: Number, default: 0 },
    log: [logSchema],
});
const Users = mongoose.model("Users", userSchema);
console.log("DB connect status : ", mongoose.connection.readyState);

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(function middleware(req, res, next) {
    const string = `${req.method} ${req.path} - ${req.ip}`;
    console.log(string);
    next();
});
const ERROR_TXT = "Something wrong.";
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.post("/api/users", async function (req, res) {
    const username = req.body.username;
    Users.findOneAndUpdate(
        { username: username },
        { username: username },
        { new: true, upsert: true },
        (err, data) => {
            if (err) {
                res.status(400).send(ERROR_TXT);
                return console.log("err : ", err);
            }
            console.log(`update db : ${data.username} : ${data._id}`);
            const resJson = {
                username: data.username,
                _id: data._id,
            };
            res.json(resJson);
        }
    );
});
app.post("/api/users/:_id/exercises", async function (req, res) {
    const _id = req.params._id;
    let { description, duration, date } = req.body;
    duration = parseInt(duration);
    date = new Date(date).toDateString();
    if (date == "Invalid Date") {
        date = new Date().toDateString();
    }
    const tmpLog = { description, duration, date };
    Users.findOne({ _id }).exec((err, data) => {
        if (err) {
            res.status(400).send(ERROR_TXT);
            return console.log("err1 : ", err.name);
        }
        const count = data.log.length + 1;
        const log = [...data.log, tmpLog];
        Users.findOneAndUpdate(
            { _id },
            { count, log },
            { new: true, upsert: true },
            (err, data) => {
                if (err) {
                    res.status(400).send(ERROR_TXT);
                    return console.log("err2 : ", err);
                }
                console.log(`update db : ${data.username} : ${data._id}`);
                const resJson = {
                    _id: data._id,
                    username: data.username,
                    date,
                    duration,
                    description,
                };
                res.json(resJson);
            }
        );
    });
});

app.get("/api/users", (req, res) => {
    Users.find({})
        .select({ _id: 1, username: 1 })
        .exec((err, data) => {
            if (err) {
                res.status(400).send(ERROR_TXT);
                return console.log("err : ", err);
            }
            res.send(data);
        });
});
app.get("/api/users/:_id/logs", (req, res) => {
    const _id = req.params._id;
    const limit = req.query.limit || Infinity;
    const from = new Date(req.query.from).getTime() || 0;
    const to = new Date(req.query.to).getTime() || Infinity;
    console.log(from, to, limit);
    Users.findOne({ _id }).exec((err, data) => {
        if (err) {
            res.status(400).send(ERROR_TXT);
            return console.log("err : ", err);
        }
        const tmpLog = [...data.log];
        const resLog = tmpLog
            .filter((log) => {
                return from <= new Date(log.date).getTime() <= to;
            })
            .slice(0, limit);
        const resJson = {
            _id: data._id,
            username: data.username,
            count: data.count,
            log: resLog,
        };
        res.json(resJson);
    });
});
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
