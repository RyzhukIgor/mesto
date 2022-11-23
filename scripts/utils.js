export const popupFullImage = document.querySelector(
    ".popup_type_reveal-image"
);
export const fullImage = document.querySelector(".popup__image");
export const fullImageDescription = document.querySelector(
    ".popup__description"
);
export const openPopup = function (popup) {
    popup.classList.add("popup_active");
    document.addEventListener("keydown", closePopupOnEsc);
};

const closePopupOnEsc = function (evt) {
    if (evt.key === "Escape") {
        const popupActive = document.querySelector(".popup_active");
        closePopup(popupActive);
    }
};

export const closePopup = function (popup) {
    popup.classList.remove("popup_active");
    document.removeEventListener("keydown", closePopupOnEsc);
};


export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];