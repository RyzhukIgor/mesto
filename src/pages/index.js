import "./index.css"; // добавьте импорт главного файла стилей

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
    avatarImage,
    formElementAvatar,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-56",
    headers: {
        authorization: "3cf2861b-0109-4432-b8bc-65d940a41203",
        "Content-Type": "application/json",
    },
});

let userId;

function createCard(item) {
    const newCard = new Card(
        item,
        userId,
        ".cards-template",
        handleCardClick,
        handleCardDelete,
        handleCardlike,
        handleCardDeletelike
    ).generateCard();
    return newCard;

}

const cardList = new Section(
    {
        renderer: (item) => {
            cardList.addItem(createCard(item));
        },
    },
    ".cards"
);

const popupLargeImage = new PopupWithImage(".popup_type_reveal-image");
popupLargeImage.setEventListeners();

const handleCardClick = function (name, image) {
    popupLargeImage.open(name, image);
};

const popupWithConfirmation = new PopupWithConfirmation(".popup-confirm-delete", {
    callbackSubmit: (cardId, card) => {
        api.deleteCard(cardId)
            .then(() => {
                card.deleteCardElement();
                popupWithConfirmation.close();
            })
            .catch((err) => {
                console.log(err);
            });
    },
});
popupWithConfirmation.setEventListeners();

const handleCardDelete = function (cardId, card) {
    popupWithConfirmation.open(cardId, card);
};

const handleCardlike = function (cardId, card) {
    api.putLikeCard(cardId)
        .then((res) => {
            card.likeCard(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

const handleCardDeletelike = function (cardId, card) {
    api.deleteLikeCard(cardId)
        .then((res) => {
            card.likeCard(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

const userInfo = new UserInfo({
    usernameSelector: ".profile__title",
    descriptionSelector: ".profile__subtitle",
    avatarSelector: ".profile__avatar",
});

Promise.all([api.getInitialCards(), api.getUserInfoProfile()])
    .then(([cards, profileInfo]) => {
        userId = profileInfo._id;
        cardList.rendererItems(cards.reverse());
        userInfo.setUserInfo({
            username: profileInfo.name,
            description: profileInfo.about,
        });
        userInfo.setUserAvatar(profileInfo.avatar);
    })
    .catch((err) => {
        console.log(err);
    });

const popupEditProfile = new PopupWithForm(".profile-popup", {
    callbackFormSubmit: (userProfileData) => {
        popupEditProfile.showProcessSaving(true);
        api.editUserProfile(userProfileData)
            .then((res) => {
                userInfo.setUserInfo({
                    username: res.name,
                    description: res.about,
                });
                popupEditProfile.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditProfile.showProcessSaving(false);
            });
    },
});
popupEditProfile.setEventListeners();

function openProfilePopup() {
    const { username, description } = userInfo.getUserInfo();
    nameInput.value = username;
    jobInput.value = description;
    popupEditProfile.open();
}
popupProfileOpenBtn.addEventListener("click", () => {
    openProfilePopup();
});

const popupAddCard = new PopupWithForm(".popup_type_add-image", {
    callbackFormSubmit: (formValues) => {
        popupAddCard.showProcessSaving(true);
        api.addNewCard({
            name: formValues.username,
            link: formValues.activity
        })
            .then((card) => {
                cardList.addItem(createCard(card));
                popupAddCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAddCard.showProcessSaving(false);
            });
    },
});
popupAddCard.setEventListeners();

const popupСhangeAvatar = new PopupWithForm(".popup-avatar", {
    callbackFormSubmit: (data) => {
        popupСhangeAvatar.showProcessSaving(true);
        api.changeAvatar(data)
            .then((avatarLink) => {
                userInfo.setUserAvatar(avatarLink.avatar);
                popupСhangeAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupСhangeAvatar.showProcessSaving(false);
            });
    },
});
popupСhangeAvatar.setEventListeners();

avatarImage.addEventListener("click", () => {
    validationFormEditAvatar.disabledButton();
    popupСhangeAvatar.open();
});

popupAddImageBtn.addEventListener("click", () => {
    popupAddCard.open();
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
const validationFormEditAvatar = new FormValidator(
    configValidation,
    formElementAvatar
);

validationFormEditAvatar.enableValidation();
validationFormAddImage.enableValidation();
validationFormEditProfile.enableValidation();
