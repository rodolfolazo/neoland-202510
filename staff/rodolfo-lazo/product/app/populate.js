//id, name, email, username, password, role

data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Peter Pan",
    "peter@pan.com",
    "peterpan",
    "12345678",
    "user"
  )
);

data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Campanilla",
    "campa@nilla.com",
    "campanilla",
    "12345678",
    "user"
  )
);

data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Pepe Grillo",
    "pepe@grillo.com",
    "pepegrillo",
    "12345678",
    "user"
  )
);

data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Annie lazo",
    "annie.lazo@hotmail.com",
    "annielv",
    "12345678",
    "user"
  )
);

data.insertPet(
  new Pet("user-1", "Kloe", "2025-05-09", "https://www.google.com")
);

data.insertPet(
  new Pet("user-1", "Neus", "2025-05-09", "https://www.google.com")
);

data.insertPet(
  new Pet("user-1", "Don Andrés", "2025-05-09", "https://www.google.com")
);

data.insertPet(
  new Pet("user-0", "Ottito Mau", "2025-05-09", "https://www.google.com")
);

data.insertPet(
  new Pet("user-0", "Thiago", "2025-05-09", "https://www.google.com")
);

data.insertPet(
  new Pet("user-3", "Toffee", "2025-05-09", "https://www.google.com")
);

data.insertPet(
  new Pet("user-3", "Dasha", "2025-05-09", "https://www.google.com")
);
