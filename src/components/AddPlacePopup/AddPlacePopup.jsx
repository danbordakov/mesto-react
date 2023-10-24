import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CardsContext } from "../../contexts/CardsContext";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')
  const card = React.useContext(CardsContext)

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
    onClose();
    }

    React.useEffect(() => {
      setName(card.name);
      setLink(card.about);
    }, [card]); 

  return (
    <PopupWithForm
    name={"newitem"}
    title={"Новое место"}
    buttonTitle={"Создать"}
    buttonType={"create"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <>
      <input onChange={handleChangeName} value={name ?? ''} id="newitem-name-input" type="text" className="popup__field popup__field_type_newitem-name" name="itemname"
        placeholder="Название" minLength="2" maxLength="30" required />
      <span className="popup__field-error newitem-name-input-error">&nbsp;</span>
      <input onChange={handleChangeLink} value={link ?? ''} id="newitem-link-input" type="url" className="popup__field popup__field_type_newitem-link" name="link"
        placeholder="Ссылка на картинку" required />
      <span className="popup__field-error newitem-link-input-error">&nbsp;</span>
    </>
  </PopupWithForm>
  )
}

export default AddPlacePopup;