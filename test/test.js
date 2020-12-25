const chai = require("chai");
const chaiHTTP = require("chai-http");
const { request } = require("express");
const server = require("../index");

// Assertion style
chai.should();

chai.use(chaiHTTP);

describe("Links API tests", () => {
  let linkBody;
  /**
   * Test POST create-link
   */
  describe("POST /api/create-link", () => {
    it("It should POST a new link with existing linkTo param", (done) => {
      const link = {
        linkTo:
          "https://www.youtube.com/watch?v=I4BZQr-5mBY&ab_channel=PragmaticReviews",
      };
      chai
        .request(server)
        .post("/api/create-link")
        .send(link)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("linkFrom");
          response.body.should.have.property("linkTo").eq(link.linkTo);
          response.body.should.have.property("title").eq("mr-sl");
          response.body.should.have.property("description").eq("This link was provided by mr-sl.com");
          
          done();
        });
    });

    it("It should POST a new link with existing linkTo, title and description param", (done) => {
      const link = {
        linkTo:
          "https://coderoad.ru/16607039/%D0%92-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B8-mocha-%D0%BF%D1%80%D0%B8-%D0%B2%D1%8B%D0%B7%D0%BE%D0%B2%D0%B5-%D0%B0%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-%D0%BA%D0%B0%D0%BA-%D0%B8%D0%B7%D0%B1%D0%B5%D0%B6%D0%B0%D1%82%D1%8C-%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B8",
        title: "some new title",
        description: "sas"
      };
      chai
        .request(server)
        .post("/api/create-link")
        .send(link)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("linkFrom");
          response.body.should.have.property("linkTo").eq(link.linkTo);
          response.body.should.have.property("title").eq(link.title);
          response.body.should.have.property("description").eq("sas");
          linkBody = response.body;
          done();
        });
    });

    it("It should POST a new link with existing linkTo, title and description param", (done) => {
      const link = {
        linkTo:
          "https://coderoad.ru/16607039/%D0%92-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B8-mocha-%D0%BF%D1%80%D0%B8-%D0%B2%D1%8B%D0%B7%D0%BE%D0%B2%D0%B5-%D0%B0%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-%D0%BA%D0%B0%D0%BA-%D0%B8%D0%B7%D0%B1%D0%B5%D0%B6%D0%B0%D1%82%D1%8C-%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B8",
        title: "some new title",
        description: "some new description",
      };
      chai
        .request(server)
        .post("/api/create-link")
        .send(link)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("linkFrom");
          response.body.should.have.property("linkTo").eq(link.linkTo);
          response.body.should.have.property("title").eq(link.title);
          response.body.should.have.property("description").eq(link.description);
          done();
        });
    });

    it("It should POST a new link with existing linkTo and description param (NON EXISTING METHOD AND PARAM PASS)", (done) => {
      const link = {
        linkTo:
          "https://coderoad.ru/16607039/%D0%92-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B8-mocha-%D0%BF%D1%80%D0%B8-%D0%B2%D1%8B%D0%B7%D0%BE%D0%B2%D0%B5-%D0%B0%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-%D0%BA%D0%B0%D0%BA-%D0%B8%D0%B7%D0%B1%D0%B5%D0%B6%D0%B0%D1%82%D1%8C-%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B8",
        description: "some new description",
        save() {
          console.log("lol")
        },
        type: "string"
      };
      chai
        .request(server)
        .post("/api/create-link")
        .send(link)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("linkFrom");
          response.body.should.have.property("linkTo").eq(link.linkTo);
          response.body.should.have.property("title").eq("mr-sl");
          response.body.should.have.property("description").eq(link.description);
          done();
        });
    });

    it("It should NOT POST a new link because of missing linkTo param", (done) => {
      const link = {
        title: "some new title",
        description: "some new description",
      };
      chai
        .request(server)
        .post("/api/create-link")
        .send(link)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be
            .a("string")
            .eq("Creating link must contain a linkTo param");
          done();
        });
    });

    it("It should NOT POST a new link because of invalid linkTo param", (done) => {
      const link = {
        linkTo: "sas",
        title: "some new title",
        description: "some new description",
      };
      chai
        .request(server)
        .post("/api/create-link")
        .send(link)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be
            .a("string")
            .eq(
              "Link you try to create short link for link which doesn't exist"
            );
          done();
        });
    });
  });
  /**
   * Test GET get-link
   */
  describe("GET /api/get-link", () => {
    it("It should GET a link by existing id", (done) => {
      const requestId = linkBody._id
      chai
        .request(server)
        .get("/api/get-link?id=" + requestId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id").eq(requestId);
          response.body.should.have.property("linkFrom");
          response.body.should.have.property("linkTo");
          response.body.should.have.property("title");
          response.body.should.have.property("description");
          done();
        });
    });

    it("It should NOT GET a link with existing id (id is invalid)", (done) => {
      const requestId = "5fb6c613130a9b461cazazaz"
      chai
        .request(server)
        .get("/api/get-link?id=" + requestId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.a("string").eq("document not found")
          done();
        });
    });
  });
});
