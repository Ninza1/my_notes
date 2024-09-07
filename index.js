const express = require('express');
const dotenv = require("dotenv").config();
const userRouter = require("./routes/user.route");
const noteRouter = require("./routes/note.route")
const connection = require("./config/db")
var cors = require('cors')
const auth = require("./middleware/auth.middleware")

const PORT = process.env.PORT || 3000
const app = express();


app.use(express.json())
app.use("/user", userRouter)
app.use("/note", auth, noteRouter)
// app.use(cors({
    app.use(cors());
//     origin: "*"
// }))
app.use(cors());

app.get("/", (req,res) =>{
    try{
        res.send("welcom to new curdk full stakc application")

    }catch(err){
        console.log(err)
    }
})

app.get("/movies-data", (req,res) =>{
   try{
    res.send("movies_data...")
   }catch(err){
    console.log(err)
   }
})


app.listen(PORT, async()=>{
    try{
        await connection;
        console.log(`server is running on port ${PORT} AND db connected successfully`);

    }catch(err){
        console.log("connection server err", err)
    }
})

