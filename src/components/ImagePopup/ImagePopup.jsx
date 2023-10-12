function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_fullview ${card ? 'popup_opened' : ''}`}>
    <div className="popup__image-container">
      <button
        type="button"
        className="popup__button-close"
        aria-label="Закрыть"
        onClick={onClose}>
      </button>
      <figure>
        <img alt="открытое изображение" className="popup__image" src={card.link} />
        <figcaption className="popup__image-name">{card.name}</figcaption>
      </figure>
    </div>
  </div>
  )
}

export default ImagePopup;