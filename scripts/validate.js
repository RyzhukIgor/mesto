const showError = (
    inputElement,
    errorMessage,
    errorElement,
    inputErrorClass,
    errorClass
) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideError = (inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const disabledButton = (buttonElement, disabledButtonClass) => {
    buttonElement.classList.add(disabledButtonClass);
    buttonElement.disabled = true;
};

const enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.classList.remove(disabledButtonClass);
    buttonElement.disabled = false;
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, inactiveButtonClass);
    } else {
        enableButton(buttonElement, inactiveButtonClass);
    }
};

const toggleInputErrorState = (
    inputElement,
    errorElement,
    inputErrorClass,
    errorClass
) => {
    if (!inputElement.validity.valid) {
        showError(
            inputElement,
            inputElement.validationMessage,
            errorElement,
            inputErrorClass,
            errorClass
        );
    } else {
        hideError(inputElement, errorElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (
    formElement,
    inputList,
    buttonElement,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
) => {
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.addEventListener("input", function () {
            toggleInputErrorState(
                inputElement,
                errorElement,
                inputErrorClass,
                errorClass
            );
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(
            formElement.querySelectorAll(config.inputSelector)
        );
        const buttonElement = formElement.querySelector(
            config.submitButtonSelector
        );
        const inactiveButtonClass = config.inactiveButtonClass;
        const inputErrorClass = config.inputErrorClass;
        const errorClass = config.errorClass;
        setEventListeners(
            formElement,
            inputList,
            buttonElement,
            inactiveButtonClass,
            inputErrorClass,
            errorClass
        );
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
});
