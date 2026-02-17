const { data, User, Pet } = require("./data");

data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Peter Pan",
    "peter@pan.com",
    "peterpan",
    "123123123",
    "https://pngimg.com/uploads/peter_pan/peter_pan_PNG11.png",
    "regular",
  ),
);
data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Wendy Darling",
    "wendy@darling.com",
    "wendydarling",
    "123123123",
    "https://static.wikia.nocookie.net/disney/images/5/53/Profile_-_Wendy_Darling.jpeg/revision/latest?cb=20190312151612",
    "regular",
  ),
);
data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Campa Nilla",
    "campa@nilla.com",
    "campanilla",
    "123123123",
    "https://static.wikia.nocookie.net/dominios-encantados/images/3/3a/WIKI_CAMPANILLA.jpg/revision/latest/scale-to-width-down/1000?cb=20141220094516&path-prefix=es",
    "regular",
  ),
);
data.insertUser(
  new User(
    "user-" + data.usersCount,
    "Pepito Grillo",
    "pepito@grillo.com",
    "pepitogrillo",
    "123123123",
    "https://media.licdn.com/dms/image/v2/C4D12AQFckegFflFZSw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1595497385163?e=2147483647&v=beta&t=MM5ft6lUnwnWao3zfuBvD4lRlTGtHUhZTqfbv_8DHHA",
    "regular",
  ),
);

data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-0",
    "Sultan",
    "2024-12-01",
    20,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTVhMDRuNzh2c2Z4cmxzN2U0aHRsOTFzMDBvcnoydG1wZTc4dXBnbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/FY8c5SKwiNf1EtZKGs/giphy.gif",
  ),
);
data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-0",
    "Simba",
    "2020-12-01",
    3,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXM3YjY4aDF6bHhtN29lZDlxYzBvZDRuOGFtN3ZoYmt6MHVzMXYzeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vyBYO8ENb4eDFpYmDI/giphy.gif",
  ),
);
data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-0",
    "Donatello",
    "2014-12-01",
    2,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnNtenlmajY2Yzd3aTFmcTh0YXA0Ymw5emVpYmY0NDV3czJ1NWFydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/65AMOI22i27d34VBdM/giphy.gif",
  ),
);

data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-1",
    "Mafia",
    "2025-07-01",
    1.5,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnI3Z3J0c3lybjFwcmVpMjVoN29nNXQzNml2ZTNjbXZ3NHdncTQ5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/901mxGLGQN2PyCQpoc/giphy.gif",
  ),
);

data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-2",
    "Dormilon",
    "2019-11-01",
    4,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnI3Z3J0c3lybjFwcmVpMjVoN29nNXQzNml2ZTNjbXZ3NHdncTQ5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v6aOjy0Qo1fIA/giphy.gif",
  ),
);
data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-2",
    "Espumita",
    "2024-10-01",
    1.4,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGdmajV3cHltazV2Z2ttZGs0bXp3YjZ0dTRmamUwNWNuYTM2a2UyeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cYZkY9HeKgofpQnOUl/giphy.gif",
  ),
);

data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-3",
    "Osito",
    "2023-09-01",
    3.5,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQ3b2NjNDE3aW1rZGUwYTJsaXI4dzV6aGI5cGk0NmE4aGJ2cmhoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lNLqexL939DTyR0uH2/giphy.gif",
  ),
);
data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-3",
    "Negrita",
    "2022-06-01",
    3.2,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQ3b2NjNDE3aW1rZGUwYTJsaXI4dzV6aGI5cGk0NmE4aGJ2cmhoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Q60eJgzLbQUM6qFRQo/giphy.gif",
  ),
);
data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-3",
    "Sargento",
    "2022-09-01",
    0.2,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzVpOXp6ZGRlNXdwdHh3Z28xODRzN3djMTl2ZTF2MHY1NGl4dW13NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3imh62nmqnKYutIGnJ/giphy.gif",
  ),
);
data.insertPet(
  new Pet(
    "pet-" + data.petsCount,
    "user-3",
    "Egoista",
    "2023-09-01",
    0.25,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzVpOXp6ZGRlNXdwdHh3Z28xODRzN3djMTl2ZTF2MHY1NGl4dW13NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/D74yIoiOstPA1e3xYL/giphy.gif",
  ),
);
