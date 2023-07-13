const express = require("express")
const { connection } = require("./Connection/db")
const cors = require("cors")
const userRouter = require("./routes/authRoutes")
const employeeRouter = require("./routes/employeeRoutes")



const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("<h1>Hello </h1>")
})

app.use("/api/user",userRouter)
app.use("/api",employeeRouter)



app.listen(5009,async()=>{
    try{
        await connection
        console.log("Server mongoose started");
    }catch(err){
        console.log(err);
    }
    console.log("Server is Running at 5009");
})