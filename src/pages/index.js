import './index.css'; // добавьте импорт главного файла стилей

import Card from "../components/Card.js";
import {
    FormValidator,
    configValidation,
} from "../components/FormValidator.js";
import { initialCards } from "../utils/utils.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    popupProfileOpenBtn,
    popupAddImageBtn,
    formElementProfile,
    nameInput,
    jobInput,
    formElementNewImage,
} from "../utils/constants.js";

const popupLargeImage = new PopupWithImage(".popup_type_reveal-image");
popupLargeImage.setEventListeners();

const handleCardClick = function (name, image) {
    popupLargeImage.open(name, image);
};

const userInfo = new UserInfo({
    usernameSelector: ".profile__title",
    descriptionSelector: ".profile__subtitle",
});

const popupEditProfile = new PopupWithForm(".profile-popup", {
    callbackFormSubmit: (data) => {
        userInfo.setUserInfo({
            username: data.username,
            description: data.activity,
        });
        popupEditProfile.close();
    },
});
popupEditProfile.setEventListeners();

function openProfilePopup(popup) {
    const {username, description} =  userInfo.getUserInfo()
    nameInput.value = username;
    jobInput.value = description;
    popup.open();
}
popupProfileOpenBtn.addEventListener("click", () => {
    openProfilePopup(popupEditProfile);
});

function createCard(item) {
    const cardElement = new Card(item, ".cards-template", handleCardClick);
    return cardElement.generateCard();
}

const loadInitialCards = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            loadInitialCards.addItem(createCard(item));
        },
    },
    ".cards"
);

loadInitialCards.rendererItems();

const saveNewCard = new PopupWithForm(".popup_type_add-image", {
    callbackFormSubmit: (formValues) => {
        loadInitialCards.addItem(
            createCard({ name: formValues.username, link: formValues.activity })
        );
        saveNewCard.close();
    },
});
saveNewCard.setEventListeners();
popupAddImageBtn.addEventListener("click", () => {
    saveNewCard.open();
    validationFormAddImage.disabledButton();
});

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
