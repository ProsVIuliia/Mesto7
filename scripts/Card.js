import { openPopup } from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();

    this._popupForScaleImg = document.querySelector('.popup_for_scale-image');
    this._formImg = document.querySelector('.popup__image');
    this._formImgTitle = document.querySelector('.popup__image-title');

  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return this._cardElement;
  }

  _like(evt) {
    evt.target.classList.toggle("element__like_active");
  }

  _removeCard(evt) {
    evt.target.closest(".element").remove();
  }

  _scaleImage() {
    this._formImg.src = this._imageLink;
    this._formImg.alt = this._title;
    this._formImgTitle.textContent = this._title;

    return openPopup(this._popupForScaleImg);
  }

  _setEventListener() {
    this._image = this._element.querySelector(".element__image");
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (e) => {
        this._like()
        console.log(this._imageLink)
        console.log(this._formImg)
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._removeCard);
      this._image.addEventListener("click", () => {
        this._scaleImage()
      });
  }

  generateCard() {
    this._setEventListener();

    this._image.src = this._imageLink;
    this._image.alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }
}
  
