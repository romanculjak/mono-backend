const mongoose = require('mongoose');


// Define the made schema
const madeSchema = new mongoose.Schema({
    id:String,
    name: String,
    make: String,
  });

  // Define the make model
export const Made = mongoose.model('Made', madeSchema);