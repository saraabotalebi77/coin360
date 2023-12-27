let cryptoCurrencies_size = 100;

export default function resizeContent(zoomIn_zoomOut) {
    if (zoomIn_zoomOut == "zoomIn" && cryptoCurrencies_size < 300) {
        cryptoCurrencies_size += 5;
    } else if (zoomIn_zoomOut == "zoomOut" && cryptoCurrencies_size > 100) {
        cryptoCurrencies_size -= 5;
    }
    document.querySelector(".cryptoCurrencies").style.cssText = `width : ${cryptoCurrencies_size}% ; height : ${cryptoCurrencies_size}%;
    top : -${(cryptoCurrencies_size - 100) / 2}% ; left : -${(cryptoCurrencies_size - 100) / 2}%`;
}