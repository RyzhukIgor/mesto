export default class Card {
    constructor(data, userId, templateSelector, handleCardClick,  handleCardDelete, handleCardLike, handleCardDeleteLike) {
        this._name = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
        this._userId = userId;
        this._id = data._id;
        this._data = data;
        this._ownerId = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._handleCardDeleteLike = handleCardDeleteLike;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    likeCard() {
        this._likes = this._data.likes;
        this._numberOfLikes.textContent = this._likes.length;
        this._cardLike.classList.toggle("card__like_active");
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _containCard() {
        this._cardImage.src = this._image;
        this._cardDescription.textContent = this._name;
        this._cardImage.alt = this._name;
    }

    _findId() {
        this._likes = this._data.likes
        return this._likes.find((userLike) => userLike._id === this._userId)
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardDescription =
            this._element.querySelector(".card__description");
        this._cardDelete = this._element.querySelector(".card__delete");
        this._cardLike = this._element.querySelector(".card__like");
        this._numberOfLikes = this._element.querySelector(".card__number-likes");

        this._setEventListeners();
        this._containCard();
        return this._element;
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", () => {
        if (!this._findId()) {
            this._handleCardLike(this._id, this)
        }
        else {
            this._handleCardDeleteLike(this._id, this)
        }});
        this._cardDelete.addEventListener("click", () => this._handleCardDelete(this._id, this));
        this._cardImage.addEventListener("click", () =>
            this._handleCardClick(this._name, this._image)
        );
    }
}
