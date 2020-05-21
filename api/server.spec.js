const supertest = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig")

afterEach(async () => {
    await db('hobbits').truncate();
});

describe('server', () => {
    it('can run the tests', () => {
        expect(true).toBeTruthy();
    });
    describe("GET /", () => {
        it('should return http status code 200 OK', () => {
            return (
                supertest(server)
                    .get('/')
                    // .expect(200) // from supertest
                    .then(response => {
                        //from jest
                        expect(response.status).toBe(200);
                    })
            );
        });

        it("should return { api: 'up' }", () => {
            return supertest(server).get('/').then(response => {
                expect(response.body).toEqual({ api: "up" });
                expect(response.body.api).toBeDefined();
                expect(response.body.api).toBe("up");


            })
        });
    });
    // this is a better test than the other test below
    describe("GET /hobbits", () => {
        it("should return an array", () => {
            supertest(server)
                .get("/hobbits")
                .then(response => {
                    expect(Array.isArray(response.body)).toBe(true);
                });
        });
    });
    describe("GET /hobbits", () => {
        it("should return an array with 4 elements", () => {
            supertest(server)
                .get("/hobbits")
                .then(response => {
                    expect(response.body).toHaveLength(0);
                });
        });
    });


});
