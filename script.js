"use strict";

const addNewWishBTN = document.querySelector(".new-wish-btn ");
const addToWishListBTN = document.querySelector(".add-to-list-btn");
const titleField = document.querySelector("#new-wish-title");
const descriptionField = document.querySelector("#new-wish-description");
const linkField = document.querySelector("#new-wish-link");
const deleteBNT = document.querySelectorAll(".delete-wish");
const wishes = document.querySelector(".wishes");
const newWishForm = document.querySelector(".new-wish-form");
const changeThemeBTN = document.querySelector(".change-theme-btn");
const head = document.querySelector("head");

const wishesArr = [];

let isDarkTheme = true;
let themeEl;

const deletingWish = function (e) {
  const indexDelete = wishesArr.findIndex(
    (wish) => wish.id === Number(e.target.parentNode.id)
  );
  wishesArr.splice(indexDelete, 1);
  e.target.parentNode.remove();
};

const themeChanger = function () {
  if (!themeEl) {
    themeEl = document.createElement("link");
    themeEl.setAttribute("href", "style-light.css");
    themeEl.setAttribute("rel", "stylesheet");
    head.appendChild(themeEl);
  } else {
    head.removeChild(themeEl);
    themeEl = null;
  }
};

changeThemeBTN.addEventListener("click", function () {
  themeChanger();
});

addNewWishBTN.addEventListener("click", function () {
  newWishForm.classList.remove("hidden");
  wishes.classList.add("hidden");
  addNewWishBTN.classList.add("hidden");
});

let wishId = 0;

addToWishListBTN.addEventListener("click", function () {
  const curTitle = titleField.value.trim();
  const curDescription = descriptionField.value.trim();
  const curLink = linkField.value.trim();

  if (curTitle || curDescription || curLink) {
    const newWish = {
      id: wishId,
      title: curTitle,
      description: curDescription,
      link: curLink,
    };

    wishId++;

    const newWishHTML = document.createElement("div");
    newWishHTML.id = `${newWish.id}`;
    newWishHTML.classList.add("wish");
    wishes.prepend(newWishHTML);

    const newWishTitle = document.createElement("div");
    newWishTitle.classList.add("wish-title");
    newWishTitle.textContent = `${newWish.title}`;
    newWishHTML.append(newWishTitle);

    const newWishDescription = document.createElement("div");
    newWishDescription.classList.add("wish-description");
    newWishDescription.textContent = `${newWish.description}`;
    newWishHTML.append(newWishDescription);

    const newWishLink = document.createElement("div");
    newWishLink.classList.add("wish-link");
    newWishHTML.append(newWishLink);

    const newWishLinkValue = document.createElement("a");
    newWishLinkValue.textContent = `${newWish.link}`;
    newWishLinkValue.href = `${newWish.link}`;
    newWishLinkValue.target = `_blank`;
    newWishLink.append(newWishLinkValue);

    const newDelBtn = document.createElement("input");
    newDelBtn.classList.add("delete-wish");
    newDelBtn.type = "button";
    newWishHTML.append(newDelBtn);
    newDelBtn.addEventListener("click", deletingWish);

    wishesArr.push(newWish);
    newWishForm.classList.add("hidden");
    wishes.classList.remove("hidden");
    addNewWishBTN.classList.remove("hidden");
    titleField.value = "";
    descriptionField.value = "";
    linkField.value = "";
  }
});

for (const btn of deleteBNT) {
  btn.addEventListener("click", deletingWish);
}
