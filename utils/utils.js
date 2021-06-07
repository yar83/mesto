import { 
  popupFullSizeImage,
  fullSizeImage,
  fullSizeImageTitle,
  formFieldName,
  formFieldAbout,
  profilePersonName,
  profilePersonAbout,
  initialCards,
  placesList,
  popups,
  popupProfile
} from './constants.js';

export function showFullSizeImage(link, name) {
  openPopup(popupFullSizeImage);
  fullSizeImage.src = link;
  fullSizeImageTitle.textContent = name; 
  fullSizeImage.setAttribute('alt', 'Изображение ' + name); 
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', catchEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', catchEscape);
}

export function submitEditProfileForm(event) {
  event.preventDefault();
  profilePersonName.textContent = formFieldName.value;
  profilePersonAbout.textContent = formFieldAbout.value;
  closePopup(popupProfile);
}

export function setPopupInitialData() {
  formFieldName.value = profilePersonName.textContent;
  formFieldAbout.value = profilePersonAbout.textContent;
}

export function addCard(item) {
  placesList.prepend(item);
}

//close popup when overlay clicked
export const catchOverlayOrCrossClick = (evt, popup) => {
  if (evt.target === popup) {
    closePopup(popup);
  }

  if (evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  }
}

//close popup when Esc pressed
const catchEscape = (evt) => {
  if (evt.key === 'Escape') {
    //find opened popup
    const openedPopup = Array.from(popups).find((popup) => {
      return popup.classList.contains('popup_opened') === true; 
    });
    closePopup(openedPopup);
  }
}

export function clearPopupData(item) {
  const formInputs = item.getElementsByClassName('form__item');
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].value = '';
  }
}
