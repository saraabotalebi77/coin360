export default function changeStyleFilterMenuItem(menu_item__value, menu_items, selected_item_value) {
    if (menu_item__value.dataset.defaultValue == selected_item_value) {
        menu_item__value.style.color = "#fff";
    } else {
        menu_item__value.style.color = "#84c47c";
    }
    menu_item__value.innerHTML = selected_item_value;
    for (let i = 0; i < menu_items.length; i++) {
        menu_items[i].classList.remove("selected");
        if (menu_items[i].innerHTML == selected_item_value) {
            menu_items[i].classList.add("selected");
        }
    }
}