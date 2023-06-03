import PopupWithForm from './PopupWithForm';
import useValidation from '../utils/useValidation';
import { useEffect } from 'react';

function AddPlacePopup(props) {
  const { values, errors, handleChange, defaultValues } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values);
  }

  useEffect(() => defaultValues({ name: '', link: '' }), [props.isOpen]);

  return (
    <PopupWithForm name="place" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} textBtn={props.textBtn}>
      <input
        id="popup__placename"
        type="text"
        name="name"
        className="popup__input"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__placename-error error">{errors.name || ''}</span>
      <input
        id="popup__placeimg"
        type="url"
        name="link"
        className="popup__input"
        placeholder="Ссылка на фото"
        required=""
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className="popup__placeimg-error error">{errors.link || ''}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
