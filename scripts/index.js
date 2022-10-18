const openEditBtn = document.querySelector(".profile__edit-button");
const openAddImageBtn = document.querySelector(".profile__add-button");

const popupAddImage = document.querySelector(".popup_type_add-image");
const popupEditProfile = document.querySelector(".profile-popup");
const popupFullImage = document.querySelector(".popup_type_reveal-image");
const popupActive = "popup_active";

const formElementsProfile = document.forms.data;
const nameInput = document.querySelector(".popup__input_type_username");
const jobInput = document.querySelector(".popup__input_type_activity");
const headingUsername = document.querySelector(".profile__title");
const headingSubtitle = document.querySelector(".profile__subtitle");

const addNewImageForm = document.forms.formImage;
const cardsArea = document.querySelector(".cards");
const imageName = document.querySelector(".popup__input_type_image-name");
const imageSrc = document.querySelector(".popup__input_type_image-src");

const fullImage = document.querySelector(".popup__image");
const fullImageDescription = document.querySelector(".popup__description");

const closeButtons = document.querySelectorAll(".popup__close");

const initialCards = [
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

const openPopup = function (popup) {
    popup.classList.add(popupActive);
};

const closePopup = function (popup) {
    popup.classList.remove(popupActive);
};

function openProfile() {
    nameInput.value = headingUsername.textContent;
    jobInput.value = headingSubtitle.textContent;
    openPopup(popupEditProfile);
}

openEditBtn.addEventListener("click", openProfile);
openAddImageBtn.addEventListener("click", () => openPopup(popupAddImage));

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

const createCard = function (name, link) {
    const cardsTemplate = document.querySelector(".cards-template").content;
    const cardElement = cardsTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardDescription = cardElement.querySelector(".card__description");
    const cardLikeActive = "card__like_active";

    cardImage.src = link;
    cardDescription.textContent = name;
    cardImage.alt = name;

    cardElement
        .querySelector(".card__like")
        .addEventListener("click", function (evt) {
            evt.target.classList.toggle(cardLikeActive);
        });

    cardElement
        .querySelector(".card__delete")
        .addEventListener("click", function (evt) {
            evt.target.closest(".card").remove();
        });

    const viewFullImage = function () {
        fullImage.src = link;
        fullImageDescription.textContent = name;
        fullImage.alt = name;
        openPopup(popupFullImage);
    };

    cardImage.addEventListener("click", viewFullImage);

    return cardElement;
};

const loadCards = function () {
    initialCards.forEach(function (card) {
        cardsArea.append(createCard(card.name, card.link));
    });
};

loadCards();

const saveNewCard = function (evt) {
    evt.preventDefault();
    cardsArea.prepend(createCard(imageName.value, imageSrc.value));
    evt.target.reset();
    closePopup(popupAddImage);
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    headingUsername.textContent = nameInput.value;
    headingSubtitle.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

formElementsProfile.addEventListener("submit", handleProfileFormSubmit);
addNewImageForm.addEventListener("submit", saveNewCard);
