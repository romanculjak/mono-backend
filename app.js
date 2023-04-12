const express = require('express');
const mongoose = require('mongoose');
import { Made } from './models/Made';
import { Make } from './models/Make';
import dotenv from "dotenv";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


//middlewares
app.use(cors())
app.use(express.json());


// Define route for getting a list of CarMakes with pagination and filtering
app.get('/vehicle-makes', async (req, res) => {
    const { page = 1, limit = 10, filter, sortOrder } = req.query;
  
    const filterObj = filter ? { name: { $regex: filter, $options: 'i' } } : {};
  
    try {
        const count = await Make.countDocuments(filterObj);
        const totalPages = Math.ceil(count / Number(limit));
        const carMakes = await Make.find(filterObj)
            .sort({[sortOrder]: 1})
          .limit(Number(limit))
          .skip((Number(page) - 1) * Number(limit))
          .exec();
        res.json({ items:carMakes,totalPages,currentPage:page, totalItems:count});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  // Add a new make
app.post('/vehicle-makes', async (req, res) => {
  try {
    const make = new Make(req.body);
    await make.save();
    res.json(make);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a make
app.put('/vehicle-makes/:makeId', async (req, res) => {
  const { makeId } = req.params;

  try {
    const make = await Make.findByIdAndUpdate(makeId, req.body, {
      new: true,
    }).exec();

    const makes = await Make.find();
    res.json(makes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a make
app.delete('/vehicle-makes/:makeId', async (req, res) => {
  const { makeId } = req.params;

  try {
    const make = await Make.findByIdAndDelete(makeId).exec();

    const makes = await Make.find();
    res.json(makes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Define route for getting a list of Vehicle Mades with pagination and filtering
app.get('/vehicle-mades', async (req, res) => {
  const { page = 1, limit = 10, filter, sortOrder } = req.query;

  const filterObj = filter ? { name: { $regex: filter, $options: 'i' } } : {};

  try {
      const count = await Made.countDocuments(filterObj);
      const totalPages = Math.ceil(count / Number(limit));
      const carMades = await Made.find(filterObj)
          .sort({[sortOrder]: 1})
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .exec();
      res.json({ items:carMades,totalPages,currentPage:page, totalItems:count});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add a new made
app.post('/vehicle-mades', async (req, res) => {
try {
  const made = new Made(req.body);
  await made.save();
  res.json(made);
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

// Update a make
app.put('/vehicle-mades/:madeId', async (req, res) => {
const { makeId } = req.params;

try {
  const made = await Made.findByIdAndUpdate(madeId, req.body, {
    new: true,
  }).exec();

  const mades = await Made.find();
  res.json(mades);
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

// Delete a make
app.delete('/vehicle-mades/:madeId', async (req, res) => {
const { madeId } = req.params;

try {
  const made = await Made.findByIdAndDelete(madeId).exec();

  const mades = await Made.find();
  res.json(mades);
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});


// Start the server
app.listen(PORT, () => {
  connect();
  console.log(`Server started on port ${PORT}`)
}
);