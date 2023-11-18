import { fetchBreeds } from './cat-api';
import { createMarkupSelect } from './createMarkupSelect';
import { fetchCatByBreed } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  infoContainer: document.querySelector('.cat-info'),
};
refs.select.addEventListener('change', selectBreed);
fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createMarkupSelect(data);
  })
  .catch(err => {
    console.log(err);
  });

function selectBreed(evt) {
  const selectedOptionId = evt.target.value;
  fetchCatByBreed(selectedOptionId)
    .then(data => {
      const { url, breeds } = data[0];
      refs.infoContainer.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
    })
    .catch(err => {
      console.log(err);
    });
}
