const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// using POST to add thecontact  
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact saved successfully" });// succes msg for save
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  using get method to fectch the contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  now to delete the contact 
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
