import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackFormSubmit }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._callbackFormSubmit = callbackFormSubmit;
        this._inputList = Array.from(
            this._popupForm.querySelectorAll(".popup__input")
        );
        this._formBtn = this._popup.querySelector(".popup__submit");
        this._formBtnTextContent = this._formBtn.textContent;
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

    showProcessSaving(loading) {
        if(loading) {
            this._formBtn.textContent = this._formBtn.textContent + '...';
        } else {
            this._formBtn.textContent = this._formBtnTextContent;
        }
        
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}
