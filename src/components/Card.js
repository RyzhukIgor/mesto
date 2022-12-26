export default class Card {
    constructor(
        data,
        userId,
        templateSelector,
        handleCardClick,
        handleCardDelete,
        handleCardlike,
        handleCardDeletelike
    ) {
        this._data = data;
        this._name = data.name;
        this._image = data.link;
        this._id = data._id;
        this._ownerIdCard = data.owner._id;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardlike = handleCardlike;
        this._handleCardDeletelike = handleCardDeletelike;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    _findId() {
        return this._likes.find((res) => res._id === this._userId);
    }

    likeCard(data) {
        this._likes = data.likes;
        
        if (this._findId()) {
            this._cardLike.classList.add("card__like_active");
        } else {
            this._cardLike.classList.remove("card__like_active");
        }
        this._numberOfLikes.textContent = this._likes.length;
    }

    deleteCardElement() {
        this._element.remove();
        this._element = null;
    }

    _containCard() {
        this._cardImage.src = this._image;
        this._cardDescription.textContent = this._name;
        this._cardImage.alt = this._name;
    }

    _isOwner() {
        if (this._userId !== this._ownerIdCard) {
            this._cardDelete.remove();
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardDescription =
            this._element.querySelector(".card__description");
        this._cardDelete = this._element.querySelector(".card__delete");
        this._cardLike = this._element.querySelector(".card__like");
        this._numberOfLikes = this._element.querySelector(
            ".card__number-likes"
        );

        this.likeCard(this._data);
        this._isOwner();
        this._setEventListeners();
        this._containCard();
        return this._element;
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", () => {

            if (!this._findId()) {
                this._handleCardlike(this._id, this);
            } else {
                this._handleCardDeletelike(this._id, this);
            }
        });
        this._cardDelete.addEventListener("click", () => {
            this._handleCardDelete(this._data._id, this);
        });
        this._cardImage.addEventListener("click", () =>
            this._handleCardClick(this._name, this._image)
        );
    }
}
