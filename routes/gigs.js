const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
// Get gig list

router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
);

// Displa add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validation
  if (!title) {
    errors.push({ text: "Please enter a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please enter some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please enter a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please enter a contact email" });
  }
  if (errors.length) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ",");
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

// Search gig
router.get("/search", (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();
  Gig.findAll({ where: { technologies: { [Op.like]: `%${term}%` } } })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});

module.exports = router;
