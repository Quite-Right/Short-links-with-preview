const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const axios = require("axios");

// http://localhost:3000/api/update-link (PUT)
router.put("/", async (req, res) => {
  // получаем объект с параметрами запроса
  const data = req.body;

  Link.findById(data.id).then(
    (document) => {
      const { linkTo, title, description, image } = data;

      if (title) {
        document.title = title;
      }
      if (description) {
        document.description = description;
      }
      if (image) {
        document.image = image;
      }
      if (linkTo && linkTo !== document.linkTo
        ) {
        axios.head(data.linkTo).then(
          () => {
            // в случае успеха отправляем запрос к бд на создание короткой ссылки
            document.linkTo = linkTo;
            document.save().then(
              (document) => {
                res.status(200).json(document);
              },
              (reason) => {
                res.status(400).send("Something went wrong");
              }
            );
          },
          (reason) => {
            res
              .status(400)
              .send(
                "Link you try to create short link for link which doesn't exist"
              );
          }
        );
      } else {
        document.save().then(
          (document) => {
            res.status(200).json(document);
          },
          (reason) => {
            res.status(400).send("Something went wrong");
          }
        );
      }
    },
    (reason) => {
      res.status(404).text("document not found");
    }
  );
});

module.exports = router;
