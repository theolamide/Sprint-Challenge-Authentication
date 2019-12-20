const request = require("supertest");

const server = require("./server.js");

describe("server.js", function() {
    describe("environment", function() {
    it("should set environment to testing", function() {
        expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe('GET /', () => {
        it('returns no array of users', () => {
            return request(server)
            .get('/')
            .then(res => {
                expect(Array.isArray(res.body)).toBe(false);
            });
        });
    })

    describe("GET /", function() {
        it("auth example", function() {
            return request(server)
            .post("/register")
            .send({ username: "Danny1", password: "12345" })
            .then(res => {
                // console.log(res)
                expect(res.serverError).toBe(false);
            });
        });
    });

    describe("GET /", function() {
        it("auth example", function() {
            return request(server)
            .post("/register")
            .send({ username: "Danny1", password: "12345" })
            .then(res => {
                // console.log(res)
                expect(res.clientError).toBe(true);
            });
        });
    });

    describe("GET /", function() {
        it("auth example", function() {
            return request(server)
            .post("/login")
            .send({ username: "Danny1", password: "12345" })
            .then(res => {
                // console.log(res)
                expect(res.status).toBe(404);
            });
        });
    });

    describe("GET /", function() {
        it("auth example", function() {
            return request(server)
            .post("/login")
            .send({ username: "Danny1", password: "12345" })
            .then(res => {
                // console.log(res)
                expect(res.type).toBe('text/html');
            });
        });
    });

});

//http://127.0.0.1:57126/login