import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = document.querySelector(".popup__image");
        this._popupDescriptiom = document.querySelector(".popup__description");
    }

    open(description, image) {
        this._popupImage.src = image;
        this._popupDescriptiom.textContent = description;
        this._popupImage.alt = description;
        super.open();
    }
}

export { PopupWithImage };
