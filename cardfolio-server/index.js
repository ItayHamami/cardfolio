const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); 
const users = require("./routes/users")
const profile = require("./routes/profile");
const posts = require("./routes/posts");
const favorites = require("./routes/favorites");
const cors = require("cors")
require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));

mongoose.connect(process.env.DB_ATLAS, {useNewUrlParser:true})
.then(()=> console.log("MongoDb connected"))
.catch((error) => console.log(error))

app.use(express.json())
app.use(cors());
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/cards", posts);
app.use("/api/favorites", favorites);


app.listen(port , () => console.log("Server started on port", port))