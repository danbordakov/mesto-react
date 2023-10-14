import React from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

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
    setSelectedCard(false);
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      
    <Header />
    <Main
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={onCardClick}
    />
    <Footer />

    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
    />

    <PopupWithForm
      name={"editinfo"}
      title={"Редактировать профиль"}
      buttonTitle={"Сохранить"}
      buttonType={"save"}
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
    >
      <>
        <input id="name-input" type="text" className="popup__field popup__field_type_name" name="name" required
          minLength="2" maxLength="40" placeholder="Введите имя" />
        <span className="popup__field-error name-input-error">&nbsp;</span>
        <input id="job-input" type="text" className="popup__field popup__field_type_job" name="job" required minLength="2"
          maxLength="200" placeholder="Введите деятельность" />
        <span className="popup__field-error job-input-error">&nbsp;</span>
      </>
    </PopupWithForm>

    <PopupWithForm
      name={"newitem"}
      title={"Новое место"}
      buttonTitle={"Создать"}
      buttonType={"create"}
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
    >
      <>
        <input id="newitem-name-input" type="text" className="popup__field popup__field_type_newitem-name" name="itemname"
          placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__field-error newitem-name-input-error">&nbsp;</span>
        <input id="newitem-link-input" type="url" className="popup__field popup__field_type_newitem-link" name="link"
          placeholder="Ссылка на картинку" required />
        <span className="popup__field-error newitem-link-input-error">&nbsp;</span>
      </>
    </PopupWithForm>

    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonTitle={"Обновить"}
      buttonType={"avatar"}
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
    >
      <>
        <input id="avatar-link-input" type="url" className="popup__field popup__field_type_avatar-link" name="link"
            placeholder="Ссылка на аватар" required />
        <span className="popup__field-error avatar-link-input-error">&nbsp;</span>
      </>
    </PopupWithForm>


    {/* <PopupWithForm
    name={"delete-confirm"}
    title={"Вы уверены?"}
    buttonTitle={"Да"}
    buttonType={"delete-confirm"}
    /> */}

    </div>
  );
}

export default App;
