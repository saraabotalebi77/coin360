

export default function changeStyleContent(cryptoCurrencies) {
    //change the location and the font-size of currencies
    const myObserver__containerCurrencies = new ResizeObserver(entries => {
        if (entries[0].borderBoxSize[0].inlineSize >= 700) {
            entries[0].target.className = "cryptoCurrencies";
        }
        else if (entries[0].borderBoxSize[0].inlineSize >= 500) {
            entries[0].target.className = "cryptoCurrencies md";
        }
        else {
            entries[0].target.className = "cryptoCurrencies sm";
        }
    });

    myObserver__containerCurrencies.observe(cryptoCurrencies);

}