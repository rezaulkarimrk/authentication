//detabase encryption authentication
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user.model");

const app = express();
const PORT = process.env.PORT || 5000;
const dbURL = process.env.DB_URI;

mongoose.connect(dbURL)
.then(() => {
    console.log("mongodb atlas is connected");
})
.catch((error) => {
    console.log(error);
    process.exit(1);
})

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/register', async (req, res) => {
    try {
        const newUser =  new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        console.log(user);
        if(user && user.password=== password){
            res.status(200).json({status: "valid user"});
        }
        else{
            res.status(404).json({status: "not valid user"});
        }
    } catch (error) {
        res.status(500).json(err.message);
    }
});


app.use((req, res, next) => {
    res.status(404).json({
        message: "route not found",
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "something broke"
    });
});


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});