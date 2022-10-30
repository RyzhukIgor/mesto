const listForm = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__error_visible");
};

const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__error_visible");
    errorElement.textContent = "";
};

const toggleButtonState = (formElement, buttonElement) => {
    const inputList = Array.from(
        formElement.querySelectorAll(listForm.inputSelector)
    );
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(listForm.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(listForm.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(
        formElement.querySelectorAll(listForm.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        listForm.submitButtonSelector
    );

    toggleButtonState(formElement, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(formElement, buttonElement);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

enableValidation(listForm);
