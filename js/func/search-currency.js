import Data from "../data/data.js";
const operation_search = (searched_value) => {
    const searched_crypto = [];
    Data["cryptoCurrency"].forEach(cryptoCurrency => {
        if (cryptoCurrency.cryptoCurrencyName.indexOf(searched_value) != -1 && searched_value.length != 0) {
            const currentCrypto = { ...cryptoCurrency };
            const searched_value_index = cryptoCurrency.cryptoCurrencyName.indexOf(searched_value);
            currentCrypto.cryptoCurrencyName = `${cryptoCurrency.cryptoCurrencyName.substring(0, searched_value_index)}<u>${cryptoCurrency.cryptoCurrencyName.substring(searched_value_index, searched_value_index + searched_value.length)}</u>${cryptoCurrency.cryptoCurrencyName.substring(searched_value_index + searched_value.length)}`
            searched_crypto.push(currentCrypto);
        }
    });
    if (searched_crypto.length != 0 || (searched_crypto.length == 0 && innerWidth <= 1000)) {
        document.querySelector(".header-navbar--right-side").classList.add("active");
    } else {
        document.querySelector(".header-navbar--right-side").classList.remove("active");
    }
    const searched_results_list_wrapper = document.querySelector(".searched-results-list-wrapper");
    searched_results_list_wrapper.innerHTML = `<ul class="searched-results-list w-100 overflow-auto px-10">
        ${searched_crypto.map(crypto => (
        `<li class="searched-results-list--item">
                <a href="#" class="searched-results-list--link d-flex justify-content-between align-items-center py-15">
                    <div class="d-flex align-items-center gap-5">
                        <img class="searched-results-list--cryptoCurrency-Icon" src="${crypto.cryptoCurrencyIcon}" alt="${crypto.cryptoCurrencyName}" width="16" height="16" />
                        <span class="searched-results-list--cryptoCurrency-Name">${crypto.cryptoCurrencyName}</span> 
                    </div>
                    <div class="d-flex align-items-center gap-5">
                        <span class="searched-results-list--cryptoCurrency-AbbrName">${crypto.cryptoCurrencyAbbr_Name}</span>
                        <img src="images/star-icon.svg" alt="star-icon"/>
                    </div>
                </a>
            </li>`)).join("")}
        </ul>
        ${searched_crypto.length != 0 ? `<button class="search-form-wrapper---responsive-close-icon close-icon d-none d-xl-block rounded-circle"></button>` : ''}`;
    if (searched_crypto.length != 0) {
        document.querySelector(".search-form-wrapper---responsive-close-icon").addEventListener("click", () => {
            document.querySelector(".header-navbar--right-side").classList.remove("active");
            document.querySelector(".search-form-wrapper").classList.remove("active");
            searched_results_list_wrapper.innerHTML = "";
        })
    }
}
const debounce = () => {
    let timer = null;
    return (searched_value) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            operation_search(searched_value);
        }, "500")
    }
}
const do_operation_search = debounce();

export default function searchCurrency(searched_value) {
    do_operation_search(searched_value);
}
