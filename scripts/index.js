const openProfileBtn = document.querySelector(".profile__edit-button");

const popupBtn = document.querySelector(".popup");
const popupActive = "popup_active";
const popupClose = document.querySelector(".popup__close");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_username");
const jobInput = document.querySelector(".popup__input_type_activity");

const headingUsername = document.querySelector(".profile__title");
const headingSubtitle = document.querySelector(".profile__subtitle");


function openProfile() {
    popupBtn.classList.add(popupActive);
    nameInput.value = headingUsername.textContent;
    jobInput.value = headingSubtitle.textContent;
}

openProfileBtn.addEventListener("click", openProfile);

function popupcloses() {
    popupBtn.classList.remove(popupActive);
};

popupClose.addEventListener("click", popupcloses);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    headingUsername.textContent = nameInput.value;
    headingSubtitle.textContent = jobInput.value;
    popupcloses();
};

formElement.addEventListener('submit', formSubmitHandler); 
