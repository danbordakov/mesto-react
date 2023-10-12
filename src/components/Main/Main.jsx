import React from "react";
import api from "../../utils/API";
import Card from "../Card/Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getUserInfo()
    .then((user) => {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
    })
  }, [])

React.useEffect(() => {
  api.getAllCards()
    .then((items) => {
      setCards(items);
    })
},[])

  return (
    <main>
    <section className="profile" aria-label="Профиль">
    <button
      type="button"
      className="profile__change-avatar-button"
      aria-label="Изменить аватар"
      onClick={onEditAvatar}>
    </button>
    <img src={userAvatar} alt="фотография профиля" className="profile__avatar" />
    <h1 className="profile__name">{userName}</h1>
    <p className="profile__description">{userDescription}</p>
    <button
      type="button"
      className="profile__edit-button"
      aria-label="Изменить"
      onClick={onEditProfile}>
    </button>
    <button
      type="button"
      className="profile__add-button"
      aria-label="Добавить"
      onClick={onAddPlace}>
    </button>
  </section>
  
  <section aria-label="Элементы" className="elements-container">
    <ul className="elements">
      {
      cards.map((item) => (
        <Card card={item} onCardClick={onCardClick} />
      ))
      }
    </ul>
  </section>


  </main>
  )
}

export default Main;