const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

 
app.use(cors());
app.use(express.json());

//  connecting toh the db
mongoose.connect("mongodb://127.0.0.1:27017/contactDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

 
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);

// to start the server we are going to define the ports to dipslay the server is running 
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
