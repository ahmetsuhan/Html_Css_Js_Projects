const articles = document.querySelector(".guides");

const logoutLinks = document.querySelectorAll(".logged-out");
const loginLinks = document.querySelectorAll(".logged-in");

const accountDetails = document.querySelector(".account-details");

const loadUser = (user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let html = `
          <div>User Mail: <b>${user.email}</b></div>
          <div>${doc.data().bio}</div>
        `;
        accountDetails.insertAdjacentHTML("afterbegin", html);
      });

    showLoginLinks();
  } else {
    accountDetails.innerHTML = "";
    showLogoutLinks();
  }
};

function showLogoutLinks() {
  loginLinks.forEach(function (item, index) {
    item.style.display = "none";
  });
  logoutLinks.forEach(function (item, index) {
    item.style.display = "block";
  });
}

function showLoginLinks() {
  loginLinks.forEach(function (item, index) {
    item.style.display = "block";
  });
  logoutLinks.forEach(function (item, index) {
    item.style.display = "none";
  });
}

const loadArticle = (data) => {
  if (data.length > 0) {
    let html = "";
    data.forEach(function (doc) {
      const article = doc.data();
      const li = `
    <li>
      <div class="collapsible-header grey lighten-4">${article.title}</div>
      <div class="collapsible-body white">${article.content}</div>
    </li>
    `;
      html += li;
    });

    articles.innerHTML = html;
  } else {
    articles.innerHTML =
      "<h5 class='center-align'>Login to see articles 😀</h5>";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  clearConsoleLog();
  let modals = document.querySelectorAll(".modal");

  M.Modal.init(modals);

  let articles = document.querySelectorAll(".collapsible");
  M.Collapsible.init(articles);
});
function clearConsoleLog() {
  console.log = function () {};
}
