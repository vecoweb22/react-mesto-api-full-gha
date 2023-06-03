import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarInput.current.value);
  }

  function clearInput() {
    avatarInput.current.value = '';
  }

  useEffect(() => clearInput(), [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={props.textBtn}
    >
      <input
        id="avatarlink"
        type="url"
        name="avatar"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required=""
        ref={avatarInput}
      />
      <span className="avatarlink-error error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
