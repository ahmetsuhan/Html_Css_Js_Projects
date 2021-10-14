class LoadingIndicator {
  /**
   *
   * @param {Object} options
   * @param {Number} options.circleCount
   * @param {String} options.position
   * @param {String | HTMLElement} options.parentEl
   */
  constructor(options = {}) {
    this.class = ".loader";
    this.circleCount = options.circleCount || 3;
    this.position = options.position || "center";
    this.circles = [];
    this.parentEl = options.parentEl || "body";
    this.init();
  }

  setLoaderPosition(position) {
    if (position) {
      this.position = position;
    }
    const positionClass = this.createPositionClass(this.position);
    this.el.classList.add(positionClass);
  }

  createPositionClass(className) {
    return `loader--${className}`;
  }

  addCirclesToLoader() {
    this.createCircle();

    this.circles.forEach((c) => {
      this.el.appendChild(c);
    });
  }

  createCircle() {
    for (let i = 0; i < this.circleCount; i++) {
      let circle = document.createElement("div");
      circle.setAttribute("class", "circle");
      this.circles = [...this.circles, circle];
    }
  }

  show(options) {
    options?.position && this.changeLoaderPositon(options.position);

    this.el.classList.add("show");

    this.render();
  }

  changeLoaderPositon(position) {
    this.removePrevLaoderClass();
    this.setLoaderPosition(position);
  }

  removePrevLaoderClass() {
    const that = this;
    function findLoaderPositionClass() {
      return `loader--${that.position}`;
    }

    const prevPos = findLoaderPositionClass();

    this.el.classList.remove(prevPos);
  }

  addNewLoaderPositionClass(className) {
    const newClassName = this.createPositionClass(className);
    this.el.classList.add(newClassName);
  }

  removeLoader() {
    const parentEl = document.querySelector(this.parentEl);

    Array.from(parentEl.querySelectorAll(this.class)).forEach((el) => {
      parentEl.removeChild(el);
    });
  }

  hide() {
    this.removeLoader();
  }

  isExist() {
    return !!document.querySelector(this.class);
  }

  render() {
    const parentEl = document.querySelector(this.parentEl);

    if (parentEl.querySelector(this.class)) {
      return;
    }

    parentEl.appendChild(this.el);
  }

  createLoader() {
    let loaderDiv = document.createElement("div");
    loaderDiv.setAttribute("class", "loader");

    this.el = loaderDiv;

    this.setLoaderPosition(this.position);
    this.addCirclesToLoader();
  }

  init() {
    this.createLoader();

    this.render();
  }
}

class PostCard {
  constructor(options) {
    this.number = options.number || null;
    this.title = options.title;
    this.content = options.content;
  }

  renderHTML() {
    return `<div class="post">
    ${this.number && `<div class="number">${this.number}</div>`}
    <div class="post-info">
      <h2 class="post-title">${this.title}</h2>
      <p class="post-body">
        ${this.content}
      </p>
    </div>
  </div>`;
  }
}

class Post {
  constructor(options) {
    this.userId = options.userId;
    this.id = options.id;
    this.number = options.number || null;
    this.title = options.title;
    this.content = options.content;
    this.card = new PostCard({
      number: this.number,
      title: this.title,
      content: this.content,
    });
  }

  renderHTML() {
    return this.card.renderHTML();
  }
}

const PostsController = (function () {
  const state = {
    posts: [],
    totalPostCount: this.posts?.length || 0,
    errors: [],
    searchResult: [],
    page: 1,
    pagePerLimit: 5,
  };

  function isExistingPost(post) {
    if (!state.posts && !state.posts.length > 0) {
      return false;
    }
    return state.posts.some((p) => p.id === post.id);
  }

  return {
    setInitialPosts: async function () {
      await this.fetchPosts()
        .then((res) => this.addPosts(res))
        .catch((err) => (state.errors = [...state.errors, { message: err }]));
    },
    increasePage: async function () {
      if (state.page >= 20) {
        return;
      } else {
        state.page += 1;
        return await this.fetchPosts()
          .then((res) => this.addPosts(res))
          .catch((err) => (state.errors = [...state.errors, { message: err }]));
      }
    },
    fetchPosts: async function () {
      const url = `https://jsonplaceholder.typicode.com/posts?_limit=${state.pagePerLimit}&_page=${state.page}`;
      return new Promise((resolve, reject) => {
        const loadingIndicator = new LoadingIndicator({
          position: "bottom",
        });

        loadingIndicator.show();

        fetch(url)
          .then((res) => resolve(res.json()))
          .catch((err) => reject(err))
          .finally(() => {
            loadingIndicator.hide();
          });
      });
    },
    getPosts: function () {
      return state.posts;
    },
    addPosts: function (posts) {
      state.posts = [
        ...state.posts,
        ...posts.map((p, index) => {
          return new Post({
            userId: p.userId,
            number: p.id,
            id: p.id,
            title: p.title,
            content: p.body,
          });
        }),
      ];
    },
    addPost: function (newPost) {
      const isExist = isExistingPost(newPost);

      if (isExist) {
        state.errors = [
          ...state.errors,
          { message: "AddPost Error!! --> Its already Exist" },
        ];
      } else {
        state.posts = [...state.posts, newPost];
      }
    },
    getPostById: function (postId) {
      return state.posts.find(({ id }) => id === postId);
    },
    deletePost: function (post) {
      const { id } = post;

      state.posts = state.posts.filter(({ _id }) => _id !== id);
    },
    deleteAllPosts: function () {
      state.posts.length = 0;
    },

    logData: function () {
      return state;
    },
  };
})();

const UIController = (function () {
  const UISelectors = {
    filter: {
      filterContainer: ".filter-container",
      filterInput: ".filter-container input",
    },
    posts: {
      postContainer: "#posts-container",
    },
  };

  return {
    populatePosts: function (posts) {
      let html = "";

      posts.forEach((post) => {
        html += post.card.renderHTML();
      });

      document.querySelector(UISelectors.posts.postContainer).innerHTML = html;
    },
    clearInput: function () {
      document.querySelector(UISelectors.filter.filterInput).value = "";
    },
    getUISelectors: function () {
      return UISelectors;
    },
  };
})();

const App = (function (PostsController, UIController) {
  function attachEvents() {
    window.addEventListener("scroll", function (e) {
      UIController.clearInput();
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        PostsController.increasePage().then(() => {
          UIController.populatePosts(PostsController.getPosts());
        });
      }
    });

    window.addEventListener("load", function () {
      PostsController.setInitialPosts().then(() => {
        UIController.populatePosts(PostsController.getPosts());
      });
    });

    document
      .querySelector(UIController.getUISelectors().filter.filterInput)
      .addEventListener("input", (e) => {
        const searchTerm = e.target.value;
        if (searchTerm) {
          const searchedPosts = PostsController.getPosts().filter((p) => {
            return (
              p.title.includes(searchTerm) || p.content.includes(searchTerm)
            );
          });

          UIController.populatePosts(searchedPosts);
        } else {
          UIController.populatePosts(PostsController.getPosts());
        }
      });
  }

  return {
    init: function () {
      UIController.clearInput();
      attachEvents();
    },
  };
})(PostsController, UIController);

(function () {
  document.addEventListener("DOMContentLoaded", App.init);
})();
