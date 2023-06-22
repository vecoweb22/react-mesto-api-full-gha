import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';
import editIcon from '../images/editIcon.svg';
import addIcon from '../images/addIcon.svg';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const cards = props.cards;

  return (
    <>
      <Header link="/signin" linkName="Выйти" email={props.email} />
      <main className="main">
        <section className="profile">
          <div className="profile__avatar">
            <button
              type="button"
              aria-label="Редактировать профиль."
              className="profile__edit-avatar"
              onClick={props.onEditAvatar}
            />
            <img
              alt="аватар"
              className="profile__img"
              src={currentUser.avatar}
            />
          </div>
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}>
            <img src={editIcon} alt="редактировать" className="profile__edit-icon" />
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            type="button"
            className="profile__add-button"
            aria-label="Добавить новое фото"
            onClick={props.onAddPlace}>
            <img src={addIcon} alt="добавить" className="profile__add-icon" />
          </button>
        </section>
        <section className="gallery" aria-label="Фотогалерея">
          <ul className="gallery__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
