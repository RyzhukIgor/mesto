import Popup from "./Popup";

export default class popupDeleteCard extends Popup {
    constructor(popupSelector, {callbackSubmit}) {
        super(popupSelector);
        this._callbackSubmit = callbackSubmit;
        this._popupForm = this._popup.querySelector(".popup_form");
    }

    setEventListeners() {
        super.setEventListeners();
     
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callbackSubmit();
        });
    }

    open(cardId, card) {
        super.open();
        this._cardId = cardId;
        this._card = card; 
    }
}