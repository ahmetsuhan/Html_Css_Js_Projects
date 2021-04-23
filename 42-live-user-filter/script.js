const result = document.getElementById("result");
const filter = document.getElementById("filter");
const container = document.querySelector(".container");
const listItems = [];
const baseUrl = "https://randomuser.me/api";
const query = "?results=";
const userCount = 500;
getData();

filter.addEventListener("input", (e) => filterData(e.target.value));

async function getData() {
  const res = await fetch(`${baseUrl}${query}${userCount}`);
  const data = await res.json();
  result.innerHTML = "";

  data.results.forEach((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `
    <img src="${user.picture.large}"alt="${user.name.first}">
    <div class="user-info">
      <h4>${user.name.first} ${user.name.last}</h4>
      <p>${user.location.city}, ${user.location.country}</p>
    </div>
    
    `;

    result.appendChild(li);

    li.addEventListener("click", () => {
      if (!container.firstElementChild.classList.contains("user-popup")) {
        const userpopup = createUserPopup(user);
        showPopup(userpopup);
        closePopup();
      }
    });
  });
}

function filterData(value) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(value.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

function showPopup(element) {
  document.querySelector(".container").prepend(element);
  document.querySelector(".user-popup").classList.add("active");
}

function closePopup() {
  const btnClose = document.querySelector(".btn-close");

  btnClose.addEventListener("click", (e) => {
    document.querySelector(".container").removeChild(container.firstChild);
  });
}

function createUserPopup(user) {
  let userPopupDiv = document.createElement("div");
  userPopupDiv.classList.add("user-popup", "animate-scale-rotate");
  userPopupDiv.innerHTML = `<div class="left animate-getleft"> 
  <img src="${user.picture.large}">
  <div class="left-text-area">
    <span class="left-subtext"><b>Gender</b>:${user.gender}</span>
  <span class="left-subtext"><b>Age</b>:${user.dob.age}</span>
  <span class="left-subtext"><b>Nationality</b>:${user.nat}</span>
  <span class="left-subtext"><b>Cell</b>:${user.cell}</span>
  <span class="left-subtext"><b>${user.location.city}, ${user.location.country}</b></span>
  </div>
</div>
<div class="right animate-getright">
<span class="btn btn-close">&times;</span>

  <h3 class="right-header">${user.name.first} ${user.name.last}</h3>
  <p class="right-user-info">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda numquam in consequuntur, voluptates doloribus expedita minus nihil? 
  </p>
  <span class="user-email">${user.email}</span>
</div>`;

  return userPopupDiv;
}
