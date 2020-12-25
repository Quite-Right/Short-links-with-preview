// инициализируем переменные окружения из .env файла
require("dotenv").config();

// подключаем пакет для работы с местоположением файлов
const path = require("path");

// подключаем пакет экспресс для создания сервера
const express = require("express");
// получаем пакет отвечающий за парсинг тела запроса
const bodyParser = require("body-parser");

// подключаем пакет для работы с базой данных MongoDB
const mongoose = require("mongoose");

// подключаем схему для монгодб
const Link = require("./models/Link");

// получаем доступ к роутеру сервера, отвечающему за создание новой ссылки
const createLinkRouter = require("./routes/CreateLinkRouter");
// получаем доступ к роутеру сервера, отвечающему за получение информации по существующей ссылке
const getLinkInfoRouter = require("./routes/GetLinkRouter");
// получаем доступ к роутеру сервера, отвечающему за обновление информации по существующей ссылке
const updateLinkRouter = require("./routes/UpdateLinkRouter");

// получаем из переменной окружения порт нашего приложения
const port = process.env.PORT || 3000;

// пытаемся установить связь между серверным приложением и удаленной базой данных MongoDB
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    // В случае выводим сообщение об успешном соединении в консоль
    console.log("MongoDB connected");
  })
  // В случае ошибки выводим сообщение о неудачном соединении и саму ошибку
  .catch((err) => console.log("Error: MongoDB connection failed\n", err));

// создаем экземпляр сервера
const app = express();

// Middleware для логирования запросов
app.use(function (req, res, next) {
  console.log(
    `Time: ${Date.now()}\n\nRequest\n ${req}\n\nResponse\n${res}\n\n`
  );
  next();
});

// задаем парсер тела запроса
app.use(bodyParser.json());

// указываем по какому пути будет доступен роутер, отвечающий за создание ссылки и подключаем его к серверу
app.use("/api/create-link", createLinkRouter);
// указываем по какому пути будет доступен роутер, отвечающий за получение информации о ссылке и подключаем его
app.use("/api/get-link", getLinkInfoRouter);
// указываем по какому пути будет доступен роутер, отвечающий за обновление информации о ссылке
app.use("/api/update-link", updateLinkRouter);

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/:id", async (req, res, next) => {
  // получаем id нашего запроса
  const id = req.params.id;
  if (id) {
    if (id.length === 6) {
      Link.findOne({ linkFrom: id }).then(
        (document) => {
          if (document) {
            const result = `
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:type" content="article" />

            <meta property="og:title" content="${document.title}"/>

            <meta property="vk:image"  content="${document.image}" />
            <meta name="twitter:image" content="${document.image}">
           
            <meta property="og:site_name" content="${"mr-sl.com"}">
            
            <meta property="og:description" content="${document.description}" />
            `;
            const html = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              ${result}
              </head>
              <body>
              <script>
                window.location.replace("${document.linkTo}");
              </script>
              </body>
              </html>
            `;
            res.status(200).send(html).end();
          } else {
            res
              .status(404)
              .sendFile(path.join(__dirname, "client", "build", "/404.html"))
              .end();
          }
        },
        (reason) => {
          res
            .status(404)
            .sendFile(path.join(__dirname, "client", "build", "/404.html"));
        }
      );
    } else if (id.length === 24) {
      Link.findById(id).then(
        (document) => {
          if (document) {
            res
              .status(200)
              .sendFile(
                path.resolve(__dirname, "client", "build", "index.html")
              )
              .end();
          } else {
            res
              .status(404)
              .sendFile(path.join(__dirname, "client", "build", "/404.html"))
              .end();
          }
        },
        (reason) => {
          next();
        }
      );
    } else {
      next();
    }
  } else {
    next();
  }
});

// domain.com/ основной путь
app.use("/", (req, res, next) => {
  if (req.path === "/") {
    // console.log((req));
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  } else {
    next();
  }
});

// 404 страница
app.use("*", (req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "client", "build", "/404.html"));
});

module.exports = app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
