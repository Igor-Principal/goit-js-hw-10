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
      refs.infoContainer.innerHTML = `<div class="box-img">
      <img src="${data.url}" alt="" />
      </div>`;
    })
    .catch(err => {
      console.log(err);
    });
}
