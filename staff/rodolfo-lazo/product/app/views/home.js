// home

const homeView = document.createElement("div");
homeView.style.display = "none";

const homeTitle = document.createElement("h1");
homeTitle.textContent = "MyPet";
homeTitle.className = "font-bold text-xl";
homeView.appendChild(homeTitle);

const homeSubtitle = document.createElement("h2");
homeSubtitle.textContent = "Welcome Home!";
homeView.appendChild(homeSubtitle);

const homeTopDiv = document.createElement("div");
homeTopDiv.className = "flex flex-row justify-between bg-gray-100 p-4";

const homeAddPetButton = document.createElement("button");
homeAddPetButton.textContent = "+ Pet";
homeAddPetButton.type = "button";
homeAddPetButton.className = "bg-black text-white px-3 py-1";
homeTopDiv.appendChild(homeAddPetButton);

const homeLogout = document.createElement("a");
homeLogout.textContent = "Logout";
homeLogout.className = "bg-black text-white rounded px-3 py-1";
homeTopDiv.appendChild(homeLogout);

homeView.appendChild(homeTopDiv);

homeAddPetButton.addEventListener("click", function (event) {
  event.preventDefault();

  homeView.style.display = "none";
  addPetView.style.display = "";
});

homeLogout.addEventListener("click", function (event) {
  event.preventDefault();

  landingView.style.display = "";
  homeView.style.display = "none";
  //data.loggedInUserId = null;
  logic.logoutUser();
  data.listaPets.length = 0;
  homeView.querySelector("ul").remove();
  homeView.querySelector("h3").remove();
});

document.body.appendChild(homeView);
