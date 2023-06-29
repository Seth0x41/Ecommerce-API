const mongoose= require('mongoose');

const dbConnection= ()=>{mongoose.connect(process.env.DB_URI)
.then((conn)=>{
    console.log("CONNECTED: ",conn.connection.host);})
.catch((err)=>{
    console.log("Error: ",err);
    process.exit(1);
})};


module.exports = dbConnection;