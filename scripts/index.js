const openPopupButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');

function togglePopup() {
  event.preventDefault(); 
  popup.classList.toggle('popup_is-opened');
}

openPopupButton.addEventListener('click', togglePopup);
