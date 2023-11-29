'use strict'

import mongoose from 'mongoose';
import app from "./app.js";
const port = 3000;

await mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
    .then( () => {
        console.log("Mongoose connect");

        // SERVER INIT
        app.listen(port, () => {
            console.log( "Server On")
        })
    })
    .catch(error => {
        console.log(error)
    }
);

