const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Connecting to the database
let mongodb_url = 'mongodb://localhost/';
let dbName = 'alfan14';

// Define url to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true  } )
let db = mongoose.connection;

// Check connection
db.once('open', ()=>{
    console.log('Database connected successfully')
})

// Check for DB error
db.on('error', (error)=>{
    console.log(error);
})

// Initialize apps
const app = express()

// Body parser middleware
app.use(express.json())

// Uploading arrays
app.use(upload.array()); 

// Cors
app.use(cors());

// Use route
app.use('/api/products', productRoute)

// Define port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})