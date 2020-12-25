const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

// http://localhost:3000/api/get-link (GET)
router.get("/", async (req, res) => {
  // получаем объект с параметрами запроса
  const data = req.query; 

  Link.findById(data.id).then(
    (document) => {
      res.status(200).json(document);
    },
    (reason) => {
      res.status(404).send("document not found");
    }
  );
});

module.exports = router;
