import { fetchBreeds } from './supportJS/cat-api';
import { createMarkupSelect } from './supportJS/createMarkupSelect';
import { fetchCatByBreed } from './supportJS/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  contCatInfo: document.querySelector('.cat-info'),
};
refs.loader.classList.replace('loader', 'hidden');
refs.error.classList.add('hidden');
refs.contCatInfo.classList.add('hidden');
refs.select.addEventListener('change', selectBreed);

let selectArr = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      selectArr.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: refs.select,
      data: selectArr,
    });
  })
  .catch(onError);

function selectBreed(evt) {
  const selectedOptionId = evt.target.value;
  refs.loader.classList.replace('hidden', 'loader');
  refs.select.classList.add('hidden');
  refs.contCatInfo.classList.add('hidden');

  fetchCatByBreed(selectedOptionId)
    .then(data => {
      refs.loader.classList.replace('loader', 'hidden');
      refs.select.classList.remove('hidden');

      const { url, breeds } = data[0];

      refs.contCatInfo.innerHTML = `<div class="box-img">
      <img src="${url}" alt="${breeds[0].name}" width="400"/>
      </div>
      <div class="box">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p>Temperament: ${breeds[0].temperament}</p>
      </div>`;
      refs.contCatInfo.classList.remove('hidden');
    })
    .catch(onError);
}
function onError() {
  refs.select.classList.remove('hidden');
  refs.loader.classList.replace('loader', 'hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or do it later!',
    {
      position: 'center-center',
      timeout: 4000,
      width: '800px',
      fontSize: '50px',
    }
  );
}
