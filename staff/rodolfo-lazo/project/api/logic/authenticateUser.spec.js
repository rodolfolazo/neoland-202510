import bcrypt from "bcryptjs";
import { expect } from "chai";

import { connect, disconnect } from "../mongoose/index.js";

import { data, UserData } from "../data/index.js";

import { logic } from "./index.js";

import { CredentialError, DuplicityError, ExistenceError } from "com";

describe("authenticateUser", () => {
  before(() => connect(process.env.TEST_DB_URL));

  let hashed = null;

  beforeEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllTransactions(),
      data.deleteAllPortfolios(),
      bcrypt.hash("123123123", 10).then((hash) => (hashed = hash)),
    ])
  );

  it("Authenticate user", () => {
    return data
      .insertUser(
        new UserData(
          null,
          "Annie",
          "admin@example.com",
          "annie123",
          hashed,
          "http://www.image.com/1",
          "regular",
        )
      )
      .then(() => logic.authenticateUser("annie123", "123123123"))
      .then((userId) => {
        expect(userId).to.exist;
        expect(userId).to.be.a("string");
        expect(userId).to.have.lengthOf(24);
      })
  })

  it("Fails on non-existing user", () => {
    let caught = null

    return logic.authenticateUser("annie123", "123123123")
    .catch(error => caught = error)
    .finally(() =>{
      expect(caught).to.exist
      expect(caught).to.be.instanceOf(ExistenceError)
      expect(caught.message).to.equal("user not found")
    })
  })

  it("Fails on existing user but wrong password", () => {
    let caught = null

    return data.insertUser(new UserData(null, "Annie Lazo", "admin@example.com", "annie123", hashed, "http://www.image/1", "regular"))
    .then(()=> logic.authenticateUser("annie123", "321321321"))
    .catch(error => caught = error)
    .finally(() => {
      expect(caught).to.be.instanceOf(CredentialError)
      expect(caught.message).to.equal("incorrect password")
    })
  })

  afterEach(() =>
    Promise.all([
      data.deleteAllUsers,
      data.deleteAllTransactions,
      data.deleteAllPortfolios,
    ])
  )

  after(() => disconnect());
})
