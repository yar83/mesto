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

export function clearPopupData(item) {
  item.querySelector('.form__entity').reset();
}
