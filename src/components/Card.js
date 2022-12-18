export default class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleCardDelete, handleCardlike, handleCardDeleteLike) {
        this._name = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardlike = handleCardlike;
        this._handleCardDeleteLike = handleCardDeleteLike;
        this._id = data._id;
        this._userId = userId;
        this._ownerid = data.ownerid._id;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    _likeCard() {
        this._cardLike.classList.toggle("card__like_active");
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _containCard() {
        this._cardImage.src = this._image;
        this._cardDescription.textContent = this._name;
        this._cardImage.alt = this._name;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardDescription =
            this._element.querySelector(".card__description");
        this._cardDelete = this._element.querySelector(".card__delete");
        this._cardLike = this._element.querySelector(".card__like");

        this._setEventListeners();
        this._containCard();
        return this._element;
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", () => this._likeCard());
        this._cardDelete.addEventListener("click", () => this._deleteCard());
        this._cardImage.addEventListener("click", () =>
            this._handleCardClick(this._name, this._image)
        );
    }
}
