const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

 
    async function connect() {
        try {
            await mongoose.connect("mongodb://localhost:27017/database1", { useNewUrlParser: true, useUnifiedTopology: true })

            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server is running on port", 3000);
    connect()
});






