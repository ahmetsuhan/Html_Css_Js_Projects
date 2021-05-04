window.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");

  const progressBar = document.querySelector(".progress-bar");

  const changeTime = 10;

  progressBar.style.animationDuration = `${changeTime}s`;

  let userCount;
  let state = {
    users: {
      female: [],
      male: [],
      currentUser: {},
      prevUser: {},
    },
  };
  const baseUrl = `https://randomuser.me/api?results=${userCount ?? 500}`;

  const jobList = [
    "baker",
    "butcher",
    "cook",
    "gardener",
    "farmer",
    "fireman",
    "lawyer",
    "hairdresser",
    "journalist",
    "mason",
    "mechanic",
    "plumber",
    "singer",
    "postman",
    "teacher",
    "pilot",
    "nurse",
    "doctor",
    "engineer",
    "tailor",
  ];

  fetchAllData();

  async function fetchAllData() {
    const response = await fetch(baseUrl);
    const data = await response.json();

    state.users.female = filterDatasByGender("female", data.results);
    state.users.male = filterDatasByGender("male", data.results);
    showUser(selectRandomUser(state.users.female));
    setInterval(function () {
      showUser(selectRandomUser(state.users.female));
    }, Math.pow(changeTime, 4));
  }

  function setPrevUser(user, state) {
    return {
      ...state,
      users: { ...state.users, prevUser: user },
    };
  }

  function setCurrentUser(user, state) {
    return {
      ...state,
      users: { ...state.users, currentUser: user },
    };
  }

  function showUser(user) {
    const userbox = createUserBox(user);

    if (container.childElementCount < 5) {
      addChild(userbox, container);
      state = setCurrentUser(user, state);
      return;
    }

    removeElement();

    addChild(userbox, container);

    state = setPrevUser(state.users.currentUser, state);

    state = setCurrentUser(user, state);
  }

  function addChild(childElement, parentElement) {
    parentElement.appendChild(childElement);
    return;
  }
  function removeElement() {
    container.removeChild(container.children[4]);
  }

  function filterDatasByGender(gender = "", datas = []) {
    return datas.filter((user) => user.gender === gender);
  }

  function selectRandomUser(users) {
    let user = users[generateRandomNumber(0, users.length)];
    if (isExistingUser(state.users, user)) {
      user = users[generateRandomNumber(0, users.length)];
    }
    user = { ...user, job: generateRandomJob(jobList) };

    return user;
  }
  function isExistingUser(users, user) {
    return users.prevUser.email === user.email;
  }
  function generateRandomNumber(min, max = 1) {
    let minVal = min ? parseInt(min) : 0;
    let maxVal = max ? parseInt(max) : minVal + 1;
    if (minVal < 0) {
      minVal = 0;
    }
    if (max < minVal) {
      maxVal = minVal + 1;
    }

    return Math.floor(Math.random() * maxVal) + minVal;
  }
  function generateRandomJob(jobList = []) {
    return jobList[generateRandomNumber(null, jobList.length)] ?? "unemployed";
  }

  function createUserBox(user) {
    let userDiv = document.createElement("div");
    userDiv.classList.add("user");

    let userImage = document.createElement("img");
    userImage.src = user.picture.large;
    userImage.classList.add("user-img");

    let userDetailsDiv = document.createElement("div");
    userDetailsDiv.classList.add("user-details");

    let username = document.createElement("h4");
    username.classList.add("username");
    username.textContent = `${user.name.first} ${user.name.last}`;

    let userRole = document.createElement("span");
    userRole.classList.add("role");
    userRole.innerText = `${user.job}`;

    userDetailsDiv.appendChild(username);
    userDetailsDiv.appendChild(userRole);

    userDiv.appendChild(userImage);
    userDiv.appendChild(userDetailsDiv);

    return userDiv;
  }
});
