const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require("./Schema/Schema");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// allow cors-origin requests
app.use(cors())


mongoose.connect("mongodb+srv://beerbalkumar:beerbalkumar@cluster0-yijsg.mongodb.net/test?retryWrites=true&w=majority")
mongoose.connection.once("open",()=>{
    console.log("database connected")
})



app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen("3000",()=>{
    console.log('server is running on port 3000')
})