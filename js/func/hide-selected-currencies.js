import Data from "../data/data.js";

const currencies = {
    shown: Data.shown_cryptoCurrencies,
    hidden: [],
    searched :[],
}
// Hide the selected currencies
function hide_selected_currencies(selected_item) {
    for (let i = 0; i < currencies.shown.length; i++) {
        if (currencies.shown[i].id == selected_item.id) {
            currencies.hidden.push(currencies.shown[i])
            currencies.shown.splice(i, 1);
            break;
        }
    }
    show_currencies(currencies.shown);
    show_hidden_currencies();
}
// Show currencies 
function show_currencies(shownCurrencies) {
    const shown_currencies_list = document.querySelector(".shownCurrencies-list");
    if (shownCurrencies.length > 0) {
        shown_currencies_list.innerHTML = shownCurrencies.map(currency => (
            `<li id="${currency.id}" class="shownCurrencies-item cursor-pointer  py-5 position-relative overflow-hidden">
                <img src="${currency.cryptoCurrencyIcon}" alt="btc" class="shownCurrencies-item--img" />
                <span class="shownCurrencies-item--abbr fw-bolder">${currency.cryptoCurrencyAbbr_Name}</span>
                <sub class="shownCurrencies-item--name">${currency.cryptoCurrencyName}</sub>
            </li>`)).join("");
        [...shown_currencies_list.children].forEach(item => {
            item.addEventListener("click", () => {
                hide_selected_currencies(item);
            })
        })
    } else {
        shown_currencies_list.innerHTML = "";
    }

}
// Remove the hidden currency
function remove_hidden_currency(delete_btn) {
    for (let i = 0; i < currencies.hidden.length; i++) {
        if (currencies.hidden[i].id == delete_btn.id) {
            currencies.shown.splice(delete_btn.id - 1, 0, currencies.hidden[i]);
            currencies.hidden.splice(i, 1);
            break;
        }
    }
    show_currencies(currencies.shown);
    show_hidden_currencies();
}
// Show the hidden currencies
function show_hidden_currencies() {
    const hide_shownCurrencies_list = document.querySelector(".hide-shownCurrencies--list-selected-items");
    if (currencies.hidden.length > 0) {
        hide_shownCurrencies_list.classList.add("py-10");
        hide_shownCurrencies_list.innerHTML = currencies.hidden.map(currency => (
            `<li  class="hide-shownCurrencies--selected-item d-flex justify-content-center align-items-center">
            <img src="${currency.cryptoCurrencyIcon}" alt="btc" class="hide-shownCurrencies--selected-item--img"/>
            <span class="selected-shownCurrency-item--abbr" class="hide-shownCurrencies--selected-item--abbr">${currency.cryptoCurrencyAbbr_Name}</span>
            <button id="${currency.id}" class="close-icon hide-shownCurrencies--selected-item--delete-btn position-relative"></button>
        </li> `)).join("");
        [...hide_shownCurrencies_list.children].forEach(item => {
            item.children[2].addEventListener("click", (e) => {
                remove_hidden_currency(e.currentTarget);
            })
        })
    } else {
        hide_shownCurrencies_list.classList.remove("py-10");
        hide_shownCurrencies_list.innerHTML = "";
    }
}
//remove all selected currencies
export function removeAllHiddenCurrencies() {
    for (let i = 0; i < currencies.hidden.length; i++) {
        currencies.shown.splice(currencies.hidden[i].id - 1, 0, currencies.hidden[i]);
    }
    currencies.hidden = [];
    show_currencies(currencies.shown);
    show_hidden_currencies();
}
//Search the desired item from the list of shown currencies
export function searchShownCurrenciesItem(input_value){
    currencies.searched = [];
    currencies.shown.forEach(item=>{
      if(item.cryptoCurrencyName.toLowerCase().includes(input_value)){
        currencies.searched.push(item);
        }
    })
    show_currencies(currencies.searched);
    console.log(currencies.searched)
}
export default function hideSelectedCurrencies() {
    show_currencies(currencies.shown);
}
