
const openProfileBtn = document.querySelector(".profile__edit-button");
const addImage = document.querySelector(".profile__add-button"); 

const popupImageAddBtn = document.querySelector(".popup_type_add-image") ;  
const popupBtnEditProfile = document.querySelector(".popup");
const popupActive = "popup_active";
const popupCloseProfile = document.querySelector(".popup__close");
const popupCloseImageProfile = document.querySelector(".popup__close_type_image-profile"); 

const formElementProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_username");
const jobInput = document.querySelector(".popup__input_type_activity");


const headingUsername = document.querySelector(".profile__title");
const headingSubtitle = document.querySelector(".profile__subtitle");


const cardsArea = document.querySelector(".cards");
const imageName = document.querySelector(".popup__input_type_image-name");
const imageSrc = document.querySelector(".popup__input_type_image-src");
const addNewImageForm = document.querySelector(".popup__form_type_add-image");

const openAllPopup = function (namePopup) {
  namePopup.classList.add(popupActive);
}

const popupAllclose = function (namePopup) {
  namePopup.classList.remove(popupActive);
};


function openProfile() {
    nameInput.value = headingUsername.textContent;
    jobInput.value = headingSubtitle.textContent;
    openAllPopup(popupBtnEditProfile);
}

openProfileBtn.addEventListener("click", openProfile);

popupCloseProfile.addEventListener("click", () => popupAllclose(popupBtnEditProfile));

addImage.addEventListener("click", () => openAllPopup(popupImageAddBtn));

popupCloseImageProfile.addEventListener("click", () => popupAllclose(popupImageAddBtn));

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    headingUsername.textContent = nameInput.value;
    headingSubtitle.textContent = jobInput.value;
    popupAllclose(popupBtnEditProfile);
};

formElementProfile.addEventListener('submit', formSubmitHandler); 


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const popupRevealImage = document.querySelector(".popup_type_reveal-image");
  const popupLargeImage = document.querySelector(".popup__image");
  const popupLargeImagedescription = document.querySelector(".popup__description");
  const closePopupLargeImage = document.querySelector(".popup__close_type_hide-image");

  closePopupLargeImage.addEventListener("click", () => popupAllclose(popupRevealImage));

  const addCards = function (name, link) {
    const cardsTemplate = document.querySelector(".cards-template").content;
    const cardElement = cardsTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardDescription = cardElement.querySelector(".card__description");
    const cardLikeActive = "card__like_active";

    cardImage.src = link;
    cardDescription.textContent = name;
    cardImage.alt = name; 

    cardElement.querySelector(".card__like").addEventListener('click', function (evt) {
      evt.target.classList.toggle(cardLikeActive);
  });

    cardElement.querySelector(".card__delete").addEventListener('click', function (evt) {
    evt.target.closest(".card").remove();
  });

    const viewLargeImage = function () {
      popupLargeImage.src = link;
      popupLargeImagedescription.textContent = name;
      popupLargeImage.alt = name;
      openAllPopup(popupRevealImage);
    };

    cardImage.addEventListener("click", viewLargeImage);

    return cardElement;
  };
 


 const loadCards = function () {
  initialCards.forEach(function (card) {
    cardsArea.append(addCards(card.name, card.link));

  });
 };

loadCards();

const saveNewCard = function(evt) {
  evt.preventDefault();
  cardsArea.prepend(addCards(imageName.value, imageSrc.value ));
  popupAllclose(popupImageAddBtn);
}

addNewImageForm.addEventListener("submit", saveNewCard);




 


