const mongoose = require('mongoose');


// Define the make schema
const makeSchema = new mongoose.Schema({
    id: String,
    name: String,
    country: String,
  });

  // Define the make model
export const Make = mongoose.model('Make', makeSchema);