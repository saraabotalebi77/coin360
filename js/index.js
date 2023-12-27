import changeStyleFilterMenuItem from "./func/change-style-filter-menu-item.js";
import searchCurrency from "./func/search-currency.js";
import changeStyleContent from "./func/change-style-content.js";
import resizeContent from "./func/resize-content.js";
import fullscreenContent from "./func/fullscreen-content.js";
import moveContent from "./func/move-content.js";
import hideSelectedCurrencies, { removeAllHiddenCurrencies, searchShownCurrenciesItem } from "./func/hide-selected-currencies.js";
import currencyRangeSlider , {resetCurrencyRange} from "./func/currency-range-slider.js";
//initial references
const top_baner__close_icon = document.querySelector(".top-baner--close-icon");
const responsive_menu_btn = document.querySelector(".burger-menu-icon-btn");
const header_navbar__left_side = document.querySelector(".header-navbar--left-side");
const header_navbar__close_icon = document.querySelector(".header-responsive-menu-close-icon");
const header_menu_items = document.querySelectorAll(".header-menu--item");
const crypto_price_unit_btn = document.querySelector(".crypto-price-unit-btn");
const crypto_units_popup_wrapper = document.querySelector(".crypto-units-popup-wrapper");
const crypto_price_units_popup__cancel_btn = document.querySelector(".crypto-price-units-popup--cancel-btn");
const search_input = document.querySelector(".search-input");
const search_form_wrapper = document.querySelector(".search-form-wrapper");
const search_form = document.querySelector(".search-form");
const header_navbar__right_side = document.querySelector(".header-navbar--right-side");
const searched_results_list_wrapper = document.querySelector(".searched-results-list-wrapper");
const search_btn = document.querySelector(".responsive-search-btn");
const footer = document.querySelector(".footer");
const footer__close_open_btn = document.querySelector(".footer--close-open-btn");
const footer__boxs_title = document.querySelectorAll(".footer--box-title");
const highLight_cryptoCurrency_value_btn = document.querySelector(".highLight-cryptoCurrency-value-btn");
const cryptoCurrency_style_changing_btns = document.querySelectorAll(".select-cryptoCurrency-style>button");
const filter_btn = document.querySelector(".filter-btn");
const filter_menu = document.querySelector(".filter-menu");
const filter_menu__inner_menu__items = document.querySelectorAll(".filter-menu--inner-menu--item");
const filter_menu__reset_btn = document.querySelector(".filter-menu--reset-btn");
const performance_detail = document.querySelector(".performance-detail");
const performance_menu_items = document.querySelectorAll(".performance-menu--item");
const custom_date__form__clear_btn = document.querySelector(".custom-date--form--clear-btn");
const custom_date__form__apply_btn = document.querySelector(".custom-date--form--apply-btn");
const currency_range = document.querySelector(".currency-range");
const currency_range__slider_wrapper = document.querySelector(".currency-range--slider-wrapper");
const currency_range__slider__selected_range = document.querySelector(".currency-range--slider--selected-range");
const currency_range__slider__dot = document.querySelectorAll(".currency-range--slider--dot");
const hide_shownCurrencies = document.querySelector(".hide-shownCurrencies");
const hide_shownCurrencies__reset_btn = document.querySelector(".hide-shownCurrencies--reset-btn");
const hide_shownCurrencies__search_input = document.querySelector(".hide-shownCurrencies--search-input");
const cryptoCurrencies = document.querySelector(".cryptoCurrencies");
const fixed_link__close_btn = document.querySelector(".fixed-link-container > .close-icon")
const zoomIn_btn = document.querySelector(".zoomIn-btn");
const zoomOut_btn = document.querySelector(".zoomOut-btn");
const fullScreen_btn = document.querySelector(".fullscreen-btn");


window.addEventListener("load", () => {
  //Change the style of cryptocurrencies
  changeStyleContent(cryptoCurrencies);
  // move origin content 
  moveContent(cryptoCurrencies);
  //Show the list of shown currency in main content and hide some of it
  hideSelectedCurrencies(hide_shownCurrencies);
  // currency range slider
  currencyRangeSlider(currency_range__slider_wrapper, currency_range__slider__selected_range, currency_range__slider__dot)
})
window.addEventListener("resize", () => {
  // Return the size and position of cryptoCurrencies to its initial state
  cryptoCurrencies.style.cssText = `width:100% ; height:100% ; top:0; left:0`;
})

//If close icon of top baner is clicked , top baner is closed
top_baner__close_icon.addEventListener("click", (e) => {
  e.target.parentElement.style.display = "none";
})
//Show the internal menu of each header menu item if the header menu item is clicked in responsive mode
header_menu_items.forEach(header_menu_item => {
  header_menu_item.addEventListener("click", () => {
    if (innerWidth <= 1000) {
      header_menu_item.classList.toggle("active");
    }
  })
})
//Show header menu if the button of menu is clicked in responsive mode
responsive_menu_btn.addEventListener("click", () => {
  header_navbar__left_side.classList.add("active");
})
//Close header menu if the button of menu is clicked in responsive mode
header_navbar__close_icon.addEventListener("click", () => {
  header_navbar__left_side.classList.remove("active");
})
//Show popup of crypto unit if its button is clicked
crypto_price_unit_btn.addEventListener("click", () => {
  crypto_units_popup_wrapper.style.display = "flex";
})
//Close popup of crypto unit if its wrapper or its cancel button is clicked
crypto_units_popup_wrapper.addEventListener("click", (e) => {
  if (!e.composedPath().includes(document.querySelector(".crypto-units-popup")) || e.target == crypto_price_units_popup__cancel_btn) {
    crypto_units_popup_wrapper.style.display = "none"
  }
})
//Show the list of searched results if the keyup event occurred
search_input.addEventListener("keyup", (e) => {
  searchCurrency(e.target.value);
})
//Show the list of searched results if the focus event occurred
search_input.addEventListener("focus", (e) => {
  if (e.target.value) {
    searchCurrency(e.target.value);
  }
})
//Close the list of searched results if the search form is reset
search_form.addEventListener("reset", () => {
  searchCurrency();
})
//Close the list of searched results if the header-navbar--right-side is clicked
header_navbar__right_side.addEventListener("click", (e) => {
  if (!e.composedPath().includes(search_form_wrapper) && [...header_navbar__right_side.classList].includes("active")) {
    header_navbar__right_side.classList.remove("active");
    searched_results_list_wrapper.innerHTML = "";
    if (innerWidth <= 1000) {
      search_form_wrapper.classList.remove("active");
    }
  }
})
//Show the search form if the button of search is clicked
search_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  document.querySelector(".search-form-wrapper").classList.add("active");
  header_navbar__right_side.classList.add("active");
  search_input.value = "";
})
//Close or open footer if its button is clicked 
footer__close_open_btn.addEventListener("click", () => {
  footer.classList.toggle("hidden");
})
//Close or open the sections of footer (Live news feed and Statistics section) if its title is clicked 
footer__boxs_title.forEach(box_title => {
  box_title.addEventListener("click", () => {
    box_title.parentElement.classList.toggle("visible");
  })
})
//Add active class to element if it's clicked and there wasn't this class
highLight_cryptoCurrency_value_btn.addEventListener("click", () => {
  highLight_cryptoCurrency_value_btn.classList.toggle("active");
})
//Select a cryptocurrency display option and add active class to it
cryptoCurrency_style_changing_btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index == 0) {
      cryptoCurrency_style_changing_btns[1].classList.remove("active");
    } else {
      cryptoCurrency_style_changing_btns[0].classList.remove("active");
    }
    btn.classList.toggle("active");
  })
})
//Move filter menu so that its hidden items is shown if the button of filter is clicked 
filter_btn.addEventListener("click", () => {
  const filter_menu = document.querySelector(".filter-menu");
  const main_navbar__width = document.querySelector(".main-navbar").getBoundingClientRect().width;
  const other_features_website__width = document.querySelector(".other-features-website").getBoundingClientRect().width;
  const filter_menu__width = filter_menu.getBoundingClientRect().width;
  if (filter_menu.getBoundingClientRect().left == 40) {
    filter_menu.style.left = `${main_navbar__width - other_features_website__width - 40 - filter_menu__width > 0 ? -300 : main_navbar__width - other_features_website__width - 160 - filter_menu__width}px`;
    filter_btn.classList.add("show-filter");
    filter_btn.setAttribute("data-title", "Show filter");
  } else {
    filter_menu.style.left = `40px`;
    filter_btn.classList.remove("show-filter");
    filter_btn.setAttribute("data-title", "Hide filter");
  }
})
//Show the inner menu of the items of filter menu if any of the items except the third item is clicked.
document.addEventListener("click", (e) => {
  const filter_menu__items = document.querySelectorAll(".filter-menu--item");
  filter_menu__items.forEach((item, index) => {
    if (e.composedPath().includes(item) && !e.composedPath().includes(performance_detail) && !e.composedPath().includes(hide_shownCurrencies) && !e.composedPath().includes(currency_range)) {
      item.classList.toggle("active");
    }
    else if (!e.composedPath().includes(performance_detail) && !e.composedPath().includes(hide_shownCurrencies) && !e.composedPath().includes(currency_range)) {
      item.classList.remove("active");
    }
  })
})
//Change color and value of filter menu item and specify which one the inner menu items from filter menu is clicked and add selected class to it  
filter_menu__inner_menu__items.forEach(item => {
  item.addEventListener("click", () => {
    changeStyleFilterMenuItem(item.parentElement.previousElementSibling.children[1], item.parentElement.children, item.innerHTML);
  })
})
//Show the content of performance item in filter menu
performance_menu_items.forEach(item => {
  item.addEventListener("click", (e) => {
    if (e.currentTarget !== performance_menu_items[4]) {
      item.parentElement.parentElement.parentElement.classList.remove("active");
    } else {
      item.parentElement.style.display = "none";
      item.parentElement.nextElementSibling.style.display = "block";
    }
    changeStyleFilterMenuItem(item.parentElement.parentElement.previousElementSibling.children[1], item.parentElement.children, item.innerHTML);
  })
})
//Apply the form of custom date
custom_date__form__apply_btn.addEventListener("click", (e) => {
  e.preventDefault();
  performance_detail.parentElement.classList.remove("active");
  performance_detail.children[1].style.display = "none";
  performance_detail.children[0].style.display = "block";
})
//Clear the form of custom date 
custom_date__form__clear_btn.addEventListener("click", () => {
  performance_detail.parentElement.classList.remove("active");
})
//Close the link that fixed in bottom right of website  
fixed_link__close_btn.addEventListener("click", (e) => {
  e.target.parentElement.style.display = "none";

})
// Zoom in the content
zoomIn_btn.addEventListener("click", () => {
  resizeContent("zoomIn");
})
// Zoom out the content
zoomOut_btn.addEventListener("click", () => {
  resizeContent("zoomOut");
})
// Zoom out and zomm in the content with mouse wheel
cryptoCurrencies.addEventListener("wheel", e => {
  e.preventDefault();
  (e.deltaY < 0) ? resizeContent("zoomIn") : resizeContent("zoomOut");
})
// Full screen the web page 
fullScreen_btn.addEventListener("click", e => {
  fullscreenContent(e.currentTarget);
})
//Remove all the hidden currencies from hide item of filter menu 
hide_shownCurrencies__reset_btn.addEventListener("click", () => {
  removeAllHiddenCurrencies();
})
//Search for the item from the shown currencies
hide_shownCurrencies__search_input.addEventListener("keyup", (e) => {
  searchShownCurrenciesItem(e.currentTarget.value.toLowerCase())
})
// Reset all items of filter menu
filter_menu__reset_btn.addEventListener("click",()=>{
  [...filter_menu.children].forEach((item,index)=>{
      if(index==5){
        resetCurrencyRange();
      }
      if(index==6){
        removeAllHiddenCurrencies();
      }
      if(index!=5 && index!=6 && index!=7){
        changeStyleFilterMenuItem(item.children[0].children[1], item.children[1].children, item.children[0].children[1].dataset.defaultValue);
      }
    })
})