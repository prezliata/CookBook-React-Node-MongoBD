const express = require("express");
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

//set up express app
const app = express();

//connect to MongoAtlas
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const PORT = process.env.PORT || 4000;
const MongoAtlasURL = 'mongodb+srv://Taras:Qaz123@cluster0-xhxir.mongodb.net/cookBook?retryWrites=true&w=majority';
const SERVER = '127.0.0.1:27017';
const DB = 'cookBook';
const MONGODB_URI = `mongodb://${SERVER}/${DB}`;
const connection = mongoose.connection;
const option = {
	socketTimeoutMS: 30000,
	keepAlive: true,
	reconnectTries: 30000
};

MongoClient.connect(MongoAtlasURL, (err, client) => {
	if (err) {
		console.log('Error occurred while connecting to MongoDB...', err);
	}
	console.log('Connected to Mongodb');
	const collection = client.db('cookBook').collection('recipeItems');
	client.close();
});

mongoose.Promise = Promise;
mongoose.connect(MongoAtlasURL, option);

app.use(express.static(path.join(__dirname, './client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './client/build/index.html'));
});

//connect to mongoDB local
// mongoose.connect('mongodb://localhost/cookBook', {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
mongoose.Promise = global.Promise;

app.use(bodyParser.json())

app.use(cors())

//initialize routes
app.use('/api', routes)

//error handling middleware
app.use((err, req, res, next) => {
    res.send({error: err.message})
})

//listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for request')
})