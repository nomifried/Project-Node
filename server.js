import express from "express"
import productRouter from "./Routers/Product.js"
import routerUser from "./Routers/User.js"
import routerOrder from "./Routers/Order.js"
import  {connectToDb} from "./config/db.js"
import dotenv from "dotenv"
import fs from "fs/promises"






function PrintToLog(req, res, next){
    try{
        fs.appendFile("./log.txt", `${new Date().toLocaleDateString()} ${req.method} ${req.url}`)
        next();
    }
    catch(err){
        return res.status(400).json({title:"error in print to log", message:err.message})
    }
}
dotenv.config()
const app = express()
connectToDb()
app.use(PrintToLog)
app.use(express.json())
app.use("/api/product",productRouter)
app.use("/api/user",routerUser)
app.use("/api/order",routerOrder)
let port = process.env.PORT
app.listen(port, "localhost", () => {
    console.log("app is listenning on port" + port)
})