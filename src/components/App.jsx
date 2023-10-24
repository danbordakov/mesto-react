import React from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import api from "../utils/API";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = React.useState([]);
  
  React.useEffect(() => {
    api.getUserInfo()
    .then((user) => {
      setCurrentUser(user);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  React.useEffect(() => {
    api.getAllCards()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      })
  },[])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter(item => item._id != card._id));
    })
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({
      newName: name,
      newJob: about
    })
    .then(setCurrentUser({name: name, about: about, avatar: currentUser.avatar, _id: currentUser._id}))
    .then(closeAllPopups)
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar({newAvatar: avatar})
    .then(setCurrentUser({name: currentUser.name, about: currentUser.about, avatar: avatar, _id: currentUser._id}))
    .then(closeAllPopups)
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.postNewCard({
      cardName: name,
      cardLink: link
    })
    .then((newCard) => {
      setCards([newCard, ...cards])
    })
  }

return (
    <div className="page">
      
    <Header />
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={onCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          currentUserId={currentUser._id}
        />

    <Footer />

    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
    />

    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />


    {/* <PopupWithForm
    name={"delete-confirm"}
    title={"Вы уверены?"}
    buttonTitle={"Да"}
    buttonType={"delete-confirm"}
    /> */}
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
