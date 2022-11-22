import Card from "./Card.js";
import { FormValidator, configValidation } from "./FormValidator.js";
import { openPopup, initialCards } from "./utils.js";

const popupProfileOpenBtn = document.querySelector(".profile__editor");
const popupAddImageBtn = document.querySelector(".profile__add-button");

const popupAddImage = document.querySelector(".popup_type_add-image");
const popupEditProfile = document.querySelector(".profile-popup");

const formElementProfile = document.forms.data;
const nameInput = document.querySelector(".popup__input_type_username");
const jobInput = document.querySelector(".popup__input_type_activity");
const headingUsername = document.querySelector(".profile__title");
const headingSubtitle = document.querySelector(".profile__subtitle");

const formElementNewImage = document.forms.formImage;
const cardsArea = document.querySelector(".cards");
const imageName = document.querySelector(".popup__input_type_image-name");
const imageSrc = document.querySelector(".popup__input_type_image-src");

const popupCloseBtn = document.querySelectorAll(".popup__close");
const popupOverlays = document.querySelectorAll(".popup");

const closePopup = function (popup) {
    popup.classList.remove("popup_active");
    document.removeEventListener("keydown", closePopupOnEsc);
};

function openProfile() {
    nameInput.value = headingUsername.textContent;
    jobInput.value = headingSubtitle.textContent;
    openPopup(popupEditProfile);
}

popupProfileOpenBtn.addEventListener("click", openProfile);
popupAddImageBtn.addEventListener("click", () => openPopup(popupAddImage));

const closePopupOnEsc = function (evt) {
    if (evt.key === "Escape") {
        const popupActive = document.querySelector(".popup_active");
        closePopup(popupActive);
    }
};

popupCloseBtn.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

popupOverlays.forEach((popupElement) => {
    popupElement.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_active")) {
            closePopup(popupElement);
        }
    });
});

function createCard(item) {
    const cardElement = new Card(item, ".cards-template").generateCard();
    return cardElement;
}

const loadInitialCards = function () {
    initialCards.forEach(function (item) {
        cardsArea.append(createCard(item));
    });
};

loadInitialCards();

const saveNewCard = function (evt) {
    evt.preventDefault();
    cardsArea.prepend(
        createCard({ name: imageName.value, link: imageSrc.value })
    );
    evt.target.reset();
    closePopup(popupAddImage);
    validationFormAddImage.disabledButton();
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    headingUsername.textContent = nameInput.value;
    headingSubtitle.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

formElementProfile.addEventListener("submit", handleProfileFormSubmit);
formElementNewImage.addEventListener("submit", saveNewCard);

const validationFormAddImage = new FormValidator(
    configValidation,
    formElementNewImage
);
const validationFormEditProfile = new FormValidator(
    configValidation,
    formElementProfile
);
validationFormAddImage.enableValidation();
validationFormEditProfile.enableValidation();
