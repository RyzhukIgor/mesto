import './index.css'; // добавьте импорт главного файла стилей

import Card from "../components/Card.js";
import {
    FormValidator,
    configValidation,
} from "../components/FormValidator.js";
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
import Api from "../components/Api.js";

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-56",
    headers: {
        authorization: "3cf2861b-0109-4432-b8bc-65d940a41203",
        "Content-Type": "application/json",
    },
});

function createCard(item, listItem) {
    const cardElement = new Card(item, ".cards-template", handleCardClick).generateCard();
    listItem.addItem(cardElement);
}

const cardList = new Section(
    { renderer: (item) => {
        createCard(item, cardList);
        },
    },
    ".cards"
);

const popupLargeImage = new PopupWithImage(".popup_type_reveal-image");
popupLargeImage.setEventListeners();

const handleCardClick = function (name, image) {
    popupLargeImage.open(name, image);
};

const userInfo = new UserInfo({
    usernameSelector: ".profile__title",
    descriptionSelector: ".profile__subtitle",
    avatarSelector: ".profile__avatar"
});

let userId

Promise.all([api.getInitialCards(), api.getUserInfoProfile()])
.then(([cards, profileInfo]) => {
userId = profileInfo._id;
cardList.rendererItems(cards);
userInfo.setUserInfo({username: profileInfo.name, description: profileInfo.about});
userInfo.setUserAvatar(profileInfo.avatar)
}
)
.catch((err) => {
    console.log(err);
})


const popupEditProfile = new PopupWithForm(".profile-popup", {
    callbackFormSubmit: (data) => {
        api.editUserProfile(data)
        .then((userData) => {
            userInfo.setUserInfo({
                username: userData.username,
                description: userData.activity,
            });
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log(err)
        })
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

const saveNewCard = new PopupWithForm(".popup_type_add-image", {
    callbackFormSubmit: (data) => {
        api.addNewCard({
         name: data.username, link: data.activity 
        })
        .then((card) => {
            createCard(card, cardList);
            saveNewCard.close();
        })
        .catch ((err) => {
            console.log(err)
        })
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
