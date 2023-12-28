// App Create

const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

// Find Port 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Add MiddleWare

app.use(express.json());
const fileupload =  require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));

// Connect to Db

const db = require("./config/database");
db.connect();

// connect to cloud

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// mount api route
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// Activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})