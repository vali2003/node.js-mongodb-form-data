const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to the database
const mongoURI = "mongodb://localhost:27017/example"; // Fixed typo in the URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error', err));

// Define a user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

// Create user model
const User = mongoose.model('User', userSchema); // Use capital 'U' for model

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { name, email, phone } = req.body;

    const newUser = new User({ name, email, phone }); // Create a new user instance

    // Save user to the database
    newUser.save()
        .then(() => {
            console.log('User saved', newUser);
            res.status(200).send('Data received');
        })
        .catch(err => {
            console.error('Error saving user', err);
            res.status(500).send('Error saving data');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Fixed syntax for PORT
});
