import './pages/index.css'; // добавьте импорт главного файла стилей

import Card from "../src/components/Card.js";
import {
    FormValidator,
    configValidation,
} from "../src/components/FormValidator.js";
import { initialCards } from "../src/components/utils.js";
import Section from "../src/components/Section.js";
import { PopupWithImage } from "../src/components/PopupWithImage.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import UserInfo from "../src/components/UserInfo.js";
import {
    popupProfileOpenBtn,
    popupAddImageBtn,
    formElementProfile,
    nameInput,
    jobInput,
    formElementNewImage,
} from "../src/components/constants/constants.js";

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

function handleProfileFormSubmit(popup) {
    nameInput.value = userInfo.getUserInfo().username;
    jobInput.value = userInfo.getUserInfo().description;
    popup.open();
}
popupProfileOpenBtn.addEventListener("click", () => {
    handleProfileFormSubmit(popupEditProfile);
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
