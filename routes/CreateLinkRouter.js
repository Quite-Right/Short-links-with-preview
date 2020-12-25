const express = require("express");
// import express from "express"
const router = express.Router();

// import axios from "axios";
// import Link from "../models/Link"
const axios = require("axios");
const Link = require("../models/Link");

const shift = parseInt("school", 36) + 42;
let counter = undefined;

// http://localhost:3000/api/create-link (POST)
router.post("/", async (req, res) => {
  // получаем объект с параметрами запроса

  //  в случае если счетчик не инициализирован инициализируем его
  if (!counter) {
    await Link.estimatedDocumentCount().then(
      (value) => {
        counter = shift + value;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  if (req.body["linkTo"]) {
    const data = Object.assign(req.body, { linkFrom: counter.toString(36) });
    // проверяем существует ли ссылка, на которую мы хотим сделать релинк
    axios.head(data.linkTo).then(
      () => {
        // в случае успеха отправляем запрос к бд на создание короткой ссылки
        Link.create(data).then(
          (document) => {
            // увиличиваем счетчик созданных нами записей
            counter++;
            // 201 - created, 200 for POST, PUT, GET, HEAD
            res.status(201).json(document);
          },
          // в случае неудачи, отправляем причину неудачи
          (reason) => {
            res.status(400).json({
              reason: "Something went wrong",
            });
          }
        );
      },
      // в случае неудачи, отправляем причину неудачи
      (reason) => {
        res
          .status(400)
          .send(
            "Link you try to create short link for link which doesn't exist"
          );
      }
    );
  }
  else {
    res.status(400).send("Creating link must contain a linkTo param");
  }
});

module.exports = router;
