function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_opened-img ${isOpen ? "popup_opened" : ""}`}>
      <figure className="popup__screen">
        <img
          className="popup__screen-image"
          src={card?.link}
          alt={`${card?.name}. Автор: ${card?.owner.name}`}
        />
        <figcaption className="popup__screen-caption">{card?.name}</figcaption>
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </figure>
    </div>
  );
}

export default ImagePopup;
