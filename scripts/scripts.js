const openProfileBtn = document.querySelector(".profile__edit-button");

const popupBtn = document.querySelector(".popup");
const popupActive = "popup_active";
const popupClose = document.querySelector(".popup__close");

const formElement = document.querySelector(".popup___form");
const nameInput = document.querySelector(".popup__input_form_username");
const jobInput = document.querySelector(".popup__input_form_activity");
const saveBtn = document.querySelector(".popup__submit");

const headingUsername = document.querySelector('h1');
headingUsername.textContent = 'Жак-Ив Кусто';
const headingSubtitle = document.querySelector('p');
headingSubtitle.textContent = 'Исследователь океана';

openProfileBtn.addEventListener("click", () => {
    popupBtn.classList.add(popupActive);
    nameInput.value = headingUsername.textContent;
    jobInput.value = headingSubtitle.textContent;
});

popupClose.addEventListener("click", () => { 
    popupBtn.classList.remove(popupActive);
});

saveBtn.addEventListener("click", () => { 
    popupBtn.classList.remove(popupActive);
}); 

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    headingUsername.textContent = nameInput.value;
    headingSubtitle.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler); 
