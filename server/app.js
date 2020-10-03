const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()
const PORT = 3005

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

//mongodb+srv://admin:<password>@cluster0.zoiyn.mongodb.net/<dbname>?retryWrites=true&w=majority
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:<password>@cluster0.zoiyn.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


mongoose.connect('mongodb+srv://admin:root@cluster0.zoiyn.mongodb.net/graphQL?retryWrites=true&w=majority')
const dbConnect = mongoose.connection
dbConnect.on('error', err => console.log(err));
dbConnect.once('open', ()=>console.log('Connected to DB'))


app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server start at http://localhost:' + PORT)
})