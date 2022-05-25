const express = require("express");
const mongoose = require("mongoose");

// setup express with app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection to MongoDB
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/hello-thoughts", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// log mongo queries being executed
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));