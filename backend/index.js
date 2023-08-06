const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 15; //eventEmitter leak fix


const loginRouter = require("./controllers/login");
const registerRouter = require("./controllers/register");
const habitRouter = require("./controllers/habit")
const express = require("express");
const cors = require('cors');

const mongoose = require("mongoose");

const url = "mongodb+srv://mainalishreejal123:eulersNumber2.7182@cluster0.eb415fi.mongodb.net/?retryWrites=true&w=majority"
mongoose.set("strictQuery",false);
mongoose.connect(url)
.then(() => console.log('Connected to MongoDB')).catch((error)=>{console.log(error)}) // eslint-disable-line no

const app = express();
app.use(cors());

app.get("/",(request,response)=>{
    response.send(`<h1>Home</h1>`);
})
app.use(express.json())
app.use('/api/register',registerRouter)


app.use('/api/login',loginRouter)
app.use('/api/habit',habitRouter)

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
