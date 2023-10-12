function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);
  } 

  return (
    <li className="element">
      <img className="element__image" alt="изображение" src={card.link} onClick={handleClick} />
      <h2 className="element__description">{card.name}</h2>
      <button type="button" className="element__button-like" aria-label="Нравится"></button>
      <p className="element__like-counter">{card.likes.length}</p>
      <button type="button" className="element__button-trash" aria-label="Удалить"></button>
    </li>
  )
}

export default Card;