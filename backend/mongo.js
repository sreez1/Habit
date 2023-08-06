const mongoose = require("mongoose");
const url = process.env.MONGOURI;
mongoose.set("strictQuery",false);
mongoose.connect(url)
.then(() => console.log('Connected to MongoDB')).catch((error)=>{console.log(error)}) // eslint-disable-line no