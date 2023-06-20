function InfoToolTip(props) {
  const message = props.message;
  return (
    <div className={`popup ${message && "popup_opened"}`}>
      <div className="popup__container popup_action_info">
        <div
          className={`popup__image ${
            message?.isSuccessfully ? "popup__image_type_success" : "popup__image_type_error"
          }`}
        />
        <h3 className="popup__title popup__title_type_info">{message?.text}</h3>
        {/* <h3 className="popup__title popup__title_type_info">{message?.text}</h3> */}
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoToolTip;
