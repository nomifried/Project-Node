import { connect } from "mongoose";
export function connectToDb(){
    connect(process.env.DB_URL)
       .then(con => console.log("mongo db connect"))
       .catch(err => {console.log("cannot connect mongo db", err)
    process.exit(1)})    
}