function Logic() {}

Logic.prototype.registerUser = function (
  name,
  email,
  username,
  password,
  paasswordRepeat
) {
  //validations
  if (!name || !email || !username || !password || !paasswordRepeat) {
    throw new Error("All fields are required");
  }
  if (password !== paasswordRepeat) {
    throw new Error("Passwords do not match");
  }
  //create user
  const user = new User(
    "user" + (data.usersCount + 1),
    name,
    email,
    username,
    password,
    "user"
  );
  data.insertUser(user);
  data.usersCount++;
};

const logic = new Logic();
