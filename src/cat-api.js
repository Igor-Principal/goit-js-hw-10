import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_qRQinlwL0qToGk7sIwBtUVXCniSQdcvy2d8vwPSUJlRdswOF3C6LNhK5RhjtMWd4';

function fetchBreeds() {
  const END_POINT = 'breeds';

  const params = {
    api_key: API_KEY,
  };
  return axios
    .get(`${BASE_URL}/${END_POINT}?${params}`)
    .then(({ data }) => data);
}
function fetchCatByBreed(breedId) {
  const END_POINT = 'images/search';

  const catParams = {
    api_key: API_KEY,
    breed_ids: breedId,
  };

  return axios
    .get(`${BASE_URL}/${END_POINT}`, { params: catParams })
    .then(({ data }) => data);
}
export { fetchBreeds, fetchCatByBreed };
