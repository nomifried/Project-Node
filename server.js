// // import express from "express"
// // import cors from "cors"
// // import productRouter from "./Routers/Product.js"
// // import routerUser from "./Routers/User.js"
// // import routerOrder from "./Routers/Order.js"
// // import  {connectToDb} from "./config/db.js"
// // import dotenv from "dotenv"
// // import fs from "fs/promises"
// // import path from "path"



// // function PrintToLog(req, res, next){
// //     try{
// //          fs.appendFile("./log.txt", `${new Date().toLocaleDateString()} ${req.method} ${req.url}`)
// //         next();
// //     }
// //     catch(err){
// //         return res.status(400).json({title:"error in print to log", message:err.message})
// //     }
// // }
// // dotenv.config()
// // const app = express()
// // const puth = require("path")
// // app.use(cors());
// // connectToDb()
// // app.use(PrintToLog)
// // app.use(express.json());
// // app.use("/api/product",productRouter);
// // app.use("/api/user",routerUser);
// // app.use("/api/order",routerOrder);
// // app.use("/images", express.static(path.join(__dirname, "public/images")));


// // let port = process.env.PORT || 3000
// // console.log("Using port: " + port);
// // app.listen(port,'0.0.0.0', () => {
// //     console.log("app is listenning on port" + port)
// // })
// import express from "express";
// import cors from "cors";
// import fs from "fs/promises";
// import dotenv from "dotenv";

// import productRouter from "./Routers/Product.js";
// import routerUser from "./Routers/User.js";
// import routerOrder from "./Routers/Order.js";
// import { connectToDb } from "./config/db.js";

// dotenv.config();
// const app = express();
// const path = require("path");


// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());

// async function PrintToLog(req, res, next) {
//     try {
//         await fs.appendFile("./log.txt", `${new Date().toISOString()} ${req.method} ${req.url}\n`);
//         next();
//     } catch (err) {
//         res.status(500).json({ title: "Error in print to log", message: err.message });
//     }
// }

// app.use(PrintToLog);
// connectToDb();



// app.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.sendStatus(200);
// });


// app.use("/api/product", productRouter);
// app.use("/api/user", routerUser);
// app.use("/api/order", routerOrder);
// // app.use("/images",express.static(path.join(__dirname,"./Public/images")));

// const port = process.env.PORT || 3000;
// app.listen(port, '0.0.0.0', () => {
//     console.log(`Server running on port ${port}`);
// });
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcryptjs'

import productRouter from "./routers/product.js";
import routerUser from "./Routers/User.js";
import routerOrder from "./Routers/Order.js";
import { connectToDb } from "./config/db.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());


// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(express.json());

async function PrintToLog(req, res, next) {
    try {
        await fs.appendFile("./log.txt", `${new Date().toISOString()} ${req.method} ${req.url}\n`);
        next();
    } catch (err) {
        res.status(500).json({ title: "Error in print to log", message: err.message });
    }
}

app.use(PrintToLog);
connectToDb();



app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});


app.use("/api/product", productRouter);
app.use("/api/user", routerUser);
app.use("/api/order", routerOrder);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});