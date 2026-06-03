import bcrypt from "bcryptjs";
import { expect } from "chai";

import { connect, disconnect } from "../mongoose/index.js";

import { data, UserData } from "../data/index.js";

import { logic } from "./index.js";

import { DuplicityError } from "com";

describe("registerUser", () => {
  before(() => connect(process.env.TEST_DB_URL));

  let hashed = null

  beforeEach(() => {
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllTransactions(),
      data.deleteAllPortfolios(),
      bcrypt.hash("123123123", 10).then(hash => hashed = hash)
    ])
  });

  it("Registers a user succesfully", () => {
    return logic
      .registerUser(
        "Annie",
        "annie@example.com",
        "annie",
        "123123123",
        "123123123",
      )
      .then(() => data.findUserByUsername("annie"))
      .then((userData) => {
        expect(userData).to.exist;
        expect(userData.name).to.equal("Annie");
        expect(userData.email).to.equal("annie@example.com");
        expect(userData.username).to.equal("annie");
        return bcrypt.compare("123123123", userData.password);
      })
      .then((match) => {
        expect(match).to.be.true;
      })
  });

  it("Fails to register a user with existing email", () => {

    let caught = null

    return data
      .insertUser(new UserData(null,
        "Annie Lazo",
        "admin@example.com",
        "annielv",
        hashed,
        "http://www.imagen/1",
        "regular")
      )
      .then(() =>
        logic.registerUser(
          "Fernando Lazo",
          "admin@example.com",
          "ferlv",
          "123123123",
          "123123123",
        ),
      )
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.exist;
        expect(caught).to.be.instanceOf(DuplicityError);
        expect(caught.message).to.equal("user email already exists");
      })
  });

  it("fails to register user with existing username", () =>{
    let caught = null

    return data.insertUser(new UserData(
      null,
      "Annie Lazo",
      "admin@example.com",
      "admin",
      hashed,
      "http://www.image1.com",
      "regular"
    ))
    .then(() => logic.registerUser("Fernando", "info@example.com", "admin", "123123123", "123123123"))
    .catch(error => caught = error)
    .finally(() => {
      expect(caught).to.exist
      expect(caught).to.be.instanceOf(DuplicityError)
      expect(caught.message).to.equal("user username already exists")
    })
  })

  afterEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllTransactions(),
      data.deleteAllPortfolios(),
    ])
  )

  after(() => disconnect());
});
