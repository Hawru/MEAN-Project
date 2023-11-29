'use strict'

import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// ROUTES
import projectRouter from './src/routes/project.js';

// MIDDLEWARES  
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

// CORS
app.use(cors());
// ROUTES

app.use('/api', projectRouter)

// EXPORTS


export default app;