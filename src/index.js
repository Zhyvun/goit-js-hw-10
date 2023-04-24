//2.
import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const optionsNtf = {
  position: 'center-center',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
};

const DEBOUNCE_DELAY = 300;
/*
//2.1.
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');
const body = document.querySelector('body');

//2.2.
inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

body.style.backgroundImage =
  'radial-gradient( circle 6px at 5.2% 51.6%,  rgba(5,8,114,1) 0%, rgba(7,3,53,1) 97.5% )';
countriesList.style.visibility = 'hidden';
countriesInfo.style.visibility = 'hidden';
// 2.3.
function onInputSearch(e) {
  const value = inputEl.value.trim();
  console.log(value);

  if (!value) {
    addHidden();
    clearInterfaceUI();
    return;
  }

  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      renderCountries(data);
    })
    .catch(err => {
      clearInterfaceUI();
      Notify.failure('Oops, there is no country with that name');
    });
}
// 2.6.1
const answerCountryList = data =>
  data.reduce(
    (acc, { flags: { svg }, name, capital, population, languages }) => {
      console.log(languages);
      languages = Object.values(languages).join(', ');
      console.log(name);
      return (
        acc +
        ` <img src="${svg}" alt="${name}" width="320" height="auto">
            <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${languages}</span></p>`
      );
    },
    ''
  );
// 2.6.2
const answerCountryInfo = data =>
  data.reduce((acc, { name: { official, common }, flags: { svg } }) => {
    return (
      acc +
      `<li>
        <img src="${svg}" alt="${common}" width="70">
        <span>${official}</span>
      </li>`
    );
  }, '');

function renderCountries(result) {
  if (result.length === 1) {
    countriesList.innerHTML = '';
    countriesList.style.visibility = 'hidden';
    countriesInfo.style.visibility = 'visible';
    countriesInfo.innerHTML = answerCountryList(result);
  }
  if (result.length >= 2 && result.length <= 10) {
    countriesInfo.innerHTML = '';
    countriesInfo.style.visibility = 'hidden';
    countriesList.style.visibility = 'visible';
    countriesList.innerHTML = answerCountryInfo(result);
  }
}

function clearInterfaceUI() {
  countriesList.innerHTML = '';
  countriesInfo.innerHTML = '';
}

function addHidden() {
  countriesList.style.visibility = 'hidden';
  countriesInfo.style.visibility = 'hidden';
}
*/

//====================

const refs = {
  inputEl: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countriesInfo: document.querySelector('.country-info'),
};

// 2.2.
refs.inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

// 2.3.
function onInputSearch() {
  const country = refs.inputEl.value.trim();
  if (!country) {
    clearMarkup();
    return;
  }
  return fetchCountries(country).then(renderCountries).catch(noticeError);
}

// 2.4.
function clearMarkup() {
  refs.countriesList.innerHTML = '';
  refs.countriesInfo.innerHTML = '';
}

// 2.5.
function noticeError() {
  clearMarkup();
  return Notify.failure(
    '👀 Oops, there is no country with that name ¯_(ツ)_/¯',
    optionsNtf
  );
}

//2.6.
function renderCountries(countriesName) {
  clearMarkup();
  if (countriesName.length > 10) {
    return Notify.info(
      '(⊙﹏⊙) Too many matches found. Please enter a more specific name. ☝',
      optionsNtf
    );
  }
  if (countriesName.length >= 2 && countriesName.length <= 10) {
    answerCountryList(countriesName);
  } else {
    answerCountryList(countriesName);
    answerCountryInfo(countriesName);
  }
}

// 2.6.1
function answerCountryList(countriesName) {
  const markupCountry = countriesName
    .map(({ name, flags }) => {
      return `<li class = "country-list__item"><img src="${flags.svg}" alt="${name.common}" width="80" height="60"><span class = "country-list__name">${name.official}</span></li>`;
    })
    .join('');
  refs.countriesList.innerHTML = markupCountry;
}

// 2.6.2
function answerCountryInfo(countriesName) {
  const markupInfo = countriesName
    .map(({ capital, population, languages }) => {
      return `<p class = "country-info__data"><b>Capital:</b> ${capital}</p><p class = "country-info__data"><b>Population:</b> ${population}</p><p class = "country-info__data"><b>Languages:</b> ${Object.values(
        languages
      ).join(', ')}</p>`;
    })
    .join('');
  refs.countriesInfo.innerHTML = markupInfo;
}
