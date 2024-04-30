
import bcrypt from "bcrypt";
import request from "supertest";
import { connect } from "../src/database/connection.js";
import app from "../src/app.js";

const TEST_DB = "mongodb+srv://mikkybeardless:igashimichael88@cluster0.ccm8zas.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"


describe("E2E tests", () => {
    jest.setTimeout(20000);
  let mongodb;

  const clearDB = async () => {
    if (mongodb) {
      const collections = await mongodb.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
      }
    }
  };

  beforeAll(async () => {
    mongodb = await connect(TEST_DB);
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await mongodb.connection.close();
  });

  it("should not be able to login", async () => {
    await clearDB();
    const res = await request(app).post("/auth/login").send({
      email: "test@yahoo.com",
      password: "password",
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("User not found");
  });

  it("should be able to sign up", async () => {
    await clearDB();
    const res = await request(app).post("/auth/register").send({
      U_name: "James",
      email: "mikky@gmail.com",
      password: "password",
      confirmPassword: "password"
      
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("User created successfully");
    expect(res.body.data.user).toHaveProperty("_id");
    expect(res.body.data.user).toHaveProperty("U_name");
    expect(res.body.data.user.first_name).toEqual("James");
    expect(res.body.data.user).toHaveProperty("email");
    expect(res.body.data.user.email).toEqual("mikky@gmail.com");
  });

  it("should be able to sign in", async () => {
    
    await clearDB();
    mongodb.connection.db.collection("users").insertOne({
      first_name: "Grace",
      last_name: "Test User",
      email: "yammy@gmail.com",
      password: await bcrypt.hash("password", 10),
    });

    const res = await request(app).post("/auth/login").send({
      email: "yammy@gmail.com",
      password: "password",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Login successful");
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data).not.toHaveProperty("password");
  });

  it("should not be able to sign in - invalid payload", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@mymail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation Error");
    expect(res.body).toHaveProperty("errors");
  });

  it("should not be able to create blog without token", async () => {
    const res = await request(app).post("/blogs/post").send({
      title: "The meg",
      body: "welcome to test 1234. hope you get it."
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Unauthorized");
    
  });

  
  it("should not be able to create user - invalid payload", async () => {
    const res = await request(app).post("/auth/sign_in").send({
      email: "test@mymail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation Error");
    expect(res.body).toHaveProperty("errors");
  });

  it("should not be able to sign in - invalid payload", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@mymail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation Error");
    expect(res.body).toHaveProperty("errors");
  });


  
  it("should get all blogs", async () => {
    const res = await request(app).get("/blogs").send();

  
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Get all blogs");
  });

});
