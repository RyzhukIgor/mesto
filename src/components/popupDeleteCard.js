import Popup from "./Popup.js";

export default class popupDeleteCard extends Popup {
    constructor(popupSelector, {callbackFormSubmit}) {
        super(popupSelector);
        this._callbackFormSubmit = callbackFormSubmit;
        this._submitButton = this._popup.querySelector(".popup__form");
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListeners("submit", (evt) => {
            evt.preventDefault();
            this._callbackFormSubmit(this._cardId, this._card);
        });
    }

    open(cardId, card) {
        this._cardId = cardId;
        this._card = card;
        super.open();
    }
}