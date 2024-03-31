const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const restaurantRoute = require("./routes/restaurant")
const lostAndFoundRoute = require("./routes/lostAndFound")
const eventRoute = require("./routes/event")
const bookRoute = require("./routes/book")
const orderRoute = require("./routes/order")
const cors = require("cors")

dotenv.config()

//Connecting Database
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db connection successful"))
.catch(e=>console.log(e))

//Middlewares
app.use(express.json())

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// app.use(cors({
//     origin: " https://cafechainashta.onrender.com/"
// }))

 app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.header("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Credentials', false);
      next();
    });

//Routes
// Routes
app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/lostAndFound", lostAndFoundRoute);
app.use("/api/event", eventRoute);
app.use("/api/book", bookRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})