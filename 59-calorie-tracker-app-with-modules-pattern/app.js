// Storage controller
const StorageController = (function () {
  return {
    storeItem: function (newItem) {
      let items = [];

      if (localStorage.getItem("items") === null) {
        items.push(newItem);
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));

        items.push(newItem);

        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemFromStorage: function (item) {
      const { id } = item;

      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });

      localStorage.setItem("items", JSON.stringify(items));
    },
    clearAllItemsFromStorage: function () {
      localStorage.removeItem("items");
    },
  };
})();
// Item Controller
const ItemController = (function () {
  //item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data structure / State
  const state = {
    items: StorageController.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: function () {
      return state.items;
    },
    addItem: function (name, calories) {
      let ID;

      if (state.items.length > 0) {
        ID = state.items[state.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      newItem = new Item(ID, name, calories);

      state.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function () {
      let total = 0;

      state.items.forEach(function (item) {
        total += item.calories;
      });
      state.totalCalories = total;

      return state.totalCalories;
    },
    getItemById: function (id) {
      return state.items.filter((item) => item.id === id);
    },
    updateItem: function (name, calories) {
      calories = parseInt(calories);

      let found = null;

      state.items.forEach(function (item) {
        if (item.id === state.currentItem[0].id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function (item) {
      const { id } = item;

      state.items = state.items.filter(function (item) {
        return item.id !== id;
      });
    },
    clearAllItems: function () {
      state.items = [];
    },
    setCurrentItem: function (item) {
      state.currentItem = item;
    },
    getCurrentItem: function () {
      return state.currentItem;
    },
    logData: function () {
      return state;
    },
  };
})();

const UIController = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    backBtn: ".back-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    clearAllBtn: ".clear-all-btn",
    addArea: ".add-area",
    editArea: ".edit-area",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>`;
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      document.querySelector(UISelectors.itemList).style.display = "block";

      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;

      // add to html
      li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;

      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);
      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function (item) {
      const { id } = item;
      const itemID = `#item-${id}`;
      const el = document.querySelector(itemID);

      if (!el.nextElementSibling && !el.previousElementSibling) {
        UIController.hideList();
      }
      el.remove();
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemController.getCurrentItem()[0].name;

      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemController.getCurrentItem()[0].calories;

      UIController.showEditState();
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);
      listItems.forEach(function (listItem) {
        listItem.remove();
      });
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },
    clearEditState: function () {
      UIController.clearInput();
      document.querySelector(UISelectors.editArea).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.editArea).style.display = "block";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

const App = (function (ItemController, UIController, StorageController) {
  const loadEventListeners = function () {
    const UISelectors = UIController.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    document.querySelector("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UIController.clearEditState);

    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    document
      .querySelector(UISelectors.clearAllBtn)
      .addEventListener("click", clearAllItemsClick);
  };

  const itemAddSubmit = function (e) {
    e.preventDefault();

    const input = UIController.getItemInput();

    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemController.addItem(input.name, input.calories);

      UIController.addListItem(newItem);

      const totalCalories = ItemController.getTotalCalories();

      UIController.showTotalCalories(totalCalories);

      StorageController.storeItem(newItem);

      UIController.clearInput();
    }
  };

  const itemEditClick = function (e) {
    e.preventDefault();

    if (e.target.classList.contains("edit-item")) {
      const listId = e.target.parentNode.parentNode.id;

      const listIdArr = listId.split("-");

      const id = parseInt(listIdArr[1]);

      const itemToEdit = ItemController.getItemById(id);

      ItemController.setCurrentItem(itemToEdit);
      UIController.addItemToForm();
    }
  };

  const itemUpdateSubmit = function (e) {
    e.preventDefault();

    const input = UIController.getItemInput();

    const updatedItem = ItemController.updateItem(input.name, input.calories);

    UIController.updateListItem(updatedItem);

    const totalCalories = ItemController.getTotalCalories();

    UIController.showTotalCalories(totalCalories);

    StorageController.updateItemStorage(updatedItem);

    UIController.clearEditState();
  };

  const itemDeleteSubmit = function (e) {
    e.preventDefault();

    const currentItem = ItemController.getCurrentItem()[0];

    ItemController.deleteItem(currentItem);

    UIController.deleteListItem(currentItem);

    const totalCalories = ItemController.getTotalCalories();
    UIController.showTotalCalories(totalCalories);

    StorageController.deleteItemFromStorage(currentItem);

    UIController.clearEditState();
  };

  const clearAllItemsClick = function (e) {
    e.preventDefault();

    ItemController.clearAllItems();

    const totalCalories = ItemController.getTotalCalories();
    UIController.showTotalCalories(totalCalories);

    StorageController.clearAllItemsFromStorage();

    UIController.removeItems();
    UIController.hideList();
  };

  return {
    init: function () {
      UIController.clearEditState();

      const items = ItemController.getItems();

      if (items.length === 0) {
        UIController.hideList();
      } else {
        UIController.populateItemList(items);
      }

      const totalCalories = ItemController.getTotalCalories();
      UIController.showTotalCalories(totalCalories);

      loadEventListeners();
    },
  };
})(ItemController, UIController, StorageController);

App.init();
