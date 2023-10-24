function Card({ card, onCardClick, onCardLike, onCardDelete, currentUserId }) {

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isLiked = card.likes.some(i => i._id === currentUserId);
  const cardLikeButtonClassName = ( 
    `element__button-like ${isLiked ? 'element__button-like_active' : ''}` 
  )
  const isOwn = card.owner._id === currentUserId;


  return (
    <>
      <img className="element__image" alt={card.name} src={card.link} onClick={handleClick} />
      <h2 className="element__description">{card.name}</h2>
      <button type="button" className={cardLikeButtonClassName} aria-label="Нравится" onClick={handleLikeClick}></button>
      <p className="element__like-counter">{card.likes.length}</p>
      {isOwn && <button type="button" className="element__button-trash" aria-label="Удалить" onClick={handleDeleteClick} />}
    </>
  )
}

export default Card;