'use strict'

import mongoose from 'mongoose'
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: String,
    description: String,
    category: String,
    langs: [String],
    year: Number,
    img: String
});

export default mongoose.model('Project', projectSchema);

