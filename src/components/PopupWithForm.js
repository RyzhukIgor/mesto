import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackFormSubmit }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._callbackFormSubmit = callbackFormSubmit;
        this._inputList = Array.from(
            this._popupForm.querySelectorAll(".popup__input")
        );
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((inputItem) => {
            formValues[inputItem.name] = inputItem.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callbackFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}
