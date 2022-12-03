const configValidation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

class FormValidator {
    constructor(settings, formElement) {
        this._formElement = formElement;
        this._submitButtonSelector = this._formElement.querySelector(
            settings.submitButtonSelector
        );
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._inputList = Array.from(
            this._formElement.querySelectorAll(settings.inputSelector)
        );
    }

    _showError(inputElement, errorMessage, errorElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError(inputElement, errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    disabledButton() {
        this._submitButtonSelector.classList.add(this._inactiveButtonClass);
        this._submitButtonSelector.disabled = true;
    }

    _enableButton() {
        this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
        this._submitButtonSelector.disabled = false;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disabledButton();
        } else {
            this._enableButton();
        }
    }

    _toggleInputErrorState(inputElement, errorElement) {
        if (!inputElement.validity.valid) {
            this._showError(
                inputElement,
                inputElement.validationMessage,
                errorElement
            );
        } else {
            this._hideError(inputElement, errorElement);
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(
                `.${inputElement.id}-error`
            );
            inputElement.addEventListener("input", () => {
                this._toggleInputErrorState(inputElement, errorElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}

export { FormValidator, configValidation };
