import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 1000;
// c задержкой 300 ну очень не удобно работать!!!!!!!
const inputEl = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


let searchQuery = "";

inputEl.addEventListener("input", debounce(startSearchCountries, DEBOUNCE_DELAY));

function startSearchCountries(event) {

event.preventDefault();
searchQuery = event.target.value.trim();
fetchCountries();
return searchQuery;
}

function clearContent(){
  inputEl.value = '';
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';  
}
function fetchCountries() {
 fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,flags,languages`)
.then(response => {return response.json()}).then(data => {


    if (data.length > 10) {
        clearContent();
    Notify.warning('Не осилил, дай больше инфы');;
   
      }
    else if (data.length > 1 && data.length <= 10) {
        clearContent();
        console.log(data)
     Notify.success('Норм, нашел пачку!');
    const markup = data.map((el) => `<div class = "info"><img src="${el.flags.svg}"/><p>${el.name.official}</p></div>`)
.join("");
        countryInfo.insertAdjacentHTML("beforeend", markup);
    }  else if (data.length === 1) { 
        clearContent();
        const markupLot = data.map((el) => ` <div class = "list"><img src="${el.flags.svg}" width = 10% /><p>${el.name.official}</p>
        <ul>
          <li>Capital:"${el.capital}"</li>
          <li>Population:"${el.population}"</li>
          <li>Languages:"${el.languages}"</li>
        </ul></div>`)
        .join("");
        countryList.insertAdjacentHTML("beforeend", markupLot);
       Notify.success('Нашел Адын!'); }
    else {
        clearContent();
      Notify.failure('Все пропало, давай по новой!');
    }
  })
}


// const markup = galleryItems
// .map((el) => `<a class="gallery__item" href="${el.original}">
// <img class="gallery__image" src="${el.preview}" alt="${el.description}" />
// </a>`)
// .join("");