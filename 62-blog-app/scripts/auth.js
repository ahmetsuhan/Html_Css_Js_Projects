//listen for auth
auth.onAuthStateChanged(function (k) {
  console.log(k);
  if (k) {
    console.log("login successfully");

    db.collection("articles").onSnapshot(function (snapshot) {
      console.log(snapshot.docs);
      loadArticle(snapshot.docs);
      loadUser(k);
    });
  } else {
    console.log("logout");
    loadArticle([]);
    loadUser();
  }
});

//create an article
const createArticleForm = document.querySelector("#create-form");
createArticleForm.addEventListener("submit", function (e) {
  e.preventDefault();

  db.collection("articles")
    .add({
      title: createArticleForm["title"].value,
      content: createArticleForm["content"].value,
    })
    .then(function () {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createArticleForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//create an account

const createAccount = document.querySelector("#signup-form");
createAccount.addEventListener("submit", function (e) {
  e.preventDefault();

  const mail = createAccount["signup-email"].value;
  const password = createAccount["signup-password"].value;

  auth.createUserWithEmailAndPassword(mail, password).then((res) => {
    console.log(res.user);

    return db
      .collection("users")
      .doc(res.user.uid)
      .set({
        bio: createAccount["signup-bio"].value,
      })
      .then(function () {
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        createAccount.reset(); // todo: refactor
      });
  });
});

//logout

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();

  auth.signOut().then(function () {
    console.log("Logout successfully");
  });
});

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mail = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(mail, password).then((res) => {
    console.log(res.user);

    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
