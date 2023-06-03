function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__window">
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" noValidate="" onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save-button" type="submit" aria-label={props.textBtn}>
            {props.textBtn}
          </button>
        </form>
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
