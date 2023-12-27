//Change the color of the dots that are not in the selected range
function specify_active_dots(currency_range__slider__dot, currency_range__slider__selected_range) {
    const start_selected_range = currency_range__slider__selected_range.offsetLeft;
    const end_selected_range = start_selected_range + currency_range__slider__selected_range.offsetWidth;
    currency_range__slider__dot.forEach(dot => {
        const left_position_dot = parseInt(getComputedStyle(dot).left);
        if ((left_position_dot < start_selected_range) || (left_position_dot > end_selected_range)) {
            dot.classList.add("in-active");
        } else {
            dot.classList.remove("in-active");
        }
    })
}
//Show the start and end value of specified range  
function specify_range_value(currency_range__slider__selected_range, currency_range__slider__dot, width_currency_range__slider_wrapper) {
    const start_selected_range = currency_range__slider__selected_range.offsetLeft;
    const end_selected_range = (start_selected_range + currency_range__slider__selected_range.offsetWidth == width_currency_range__slider_wrapper) ? start_selected_range + currency_range__slider__selected_range.offsetWidth - 5 : start_selected_range + currency_range__slider__selected_range.offsetWidth;
    let position = {
        start : null,
        end : null,
    }

    for (let i = 0; i < currency_range__slider__dot.length - 1; i++){
        const range = {
            start: currency_range__slider__dot[i].getAttribute('data-breakPoints'),
            end: currency_range__slider__dot[i + 1].getAttribute('data-breakPoints'),
            start_width: currency_range__slider__dot[i].offsetLeft,
            end_width: currency_range__slider__dot[i + 1].offsetLeft,
            width: currency_range__slider__dot[i + 1].offsetLeft - currency_range__slider__dot[i].offsetLeft,
            subdivision_width : (currency_range__slider__dot[i + 1].offsetLeft - currency_range__slider__dot[i].offsetLeft) / (currency_range__slider__dot[i + 1].getAttribute('data-breakPoints')-currency_range__slider__dot[i].getAttribute('data-breakPoints')),
        }
        if(start_selected_range>=range.start_width && start_selected_range<=range.end_width){
            position.start = parseInt(Number(range.start) + ((start_selected_range - range.start_width) / range.subdivision_width)) ;
        }
        if(end_selected_range>=range.start_width && end_selected_range<=range.end_width){
            position.end = parseInt(Number(range.start) + ((end_selected_range - range.start_width) / range.subdivision_width)) ;
        }
    }
    position.start = (position.start >=1000000000) ? `${(position.start/1000000000).toFixed(1)}b` :  (position.start >=1000000) ? `${(position.start/1000000).toFixed(1)}m` : (position.start >=1000) ? `${(position.start/1000).toFixed(1)}k` : `${position.start.toFixed(1)}`
    position.end = (position.end >=1000000000) ? `${(position.end/1000000000).toFixed(1)}b` :  (position.end >=1000000) ? `${(position.end/1000000).toFixed(1)}m` : (position.end >=1000) ? `${(position.end/1000).toFixed(1)}k` : `${position.end.toFixed(1)}`
    document.getElementById("start-range").innerHTML = `${position.start}$`;
    document.getElementById("end-range").innerHTML = `${position.end}`;

}
export function resetCurrencyRange() {
    const currency_range__slider__selected_range = document.querySelector(".currency-range--slider--selected-range");
    const currency_range__slider__dot = document.querySelectorAll(".currency-range--slider--dot");
    const currency_range__slider_wrapper = document.querySelector(".currency-range--slider-wrapper");
    currency_range__slider__selected_range.style.left = "0px";
    currency_range__slider__selected_range.style.right = "0px";
    currency_range__slider__selected_range.style.width = `${currency_range__slider_wrapper.getBoundingClientRect().width}px`;
    document.getElementById("start-range").innerHTML = `0$`;
    document.getElementById("end-range").innerHTML = `552.0b`;
    specify_active_dots(currency_range__slider__dot, currency_range__slider__selected_range);
}
export default function currencyRangeSlider(currency_range__slider_wrapper, currency_range__slider__selected_range, currency_range__slider__dot) {
    //Definition variables  
    let direction = null;
    let prev_coordinateX = null;
    const width_currency_range__slider_wrapper = currency_range__slider_wrapper.getBoundingClientRect().width;

    //Go to the coordinates of the point where the mousedown event happened
    currency_range__slider_wrapper.addEventListener("mousedown", (e) => {
        const start_selected_range = currency_range__slider__selected_range.offsetLeft;
        const width_selected_range = currency_range__slider__selected_range.offsetWidth;
        const end_selected_range = start_selected_range + width_selected_range;
        const left_currency_range__slider_wrapper = currency_range__slider_wrapper.getBoundingClientRect().left;
        const coordinateX = (e.clientX - left_currency_range__slider_wrapper) < 0 ? 0 : (e.clientX - left_currency_range__slider_wrapper);
        prev_coordinateX = coordinateX;

        if (Math.abs(coordinateX - start_selected_range) <= Math.abs(coordinateX - end_selected_range)) {
            currency_range__slider__selected_range.style.left = `${coordinateX}px`;
            currency_range__slider__selected_range.style.width = `${width_selected_range + (start_selected_range - coordinateX)}px`;
            direction = "left";
            currency_range__slider__selected_range.classList.add("move-left");
            currency_range__slider__selected_range.classList.add("click-left");
        } else {
            currency_range__slider__selected_range.style.right = `${(coordinateX >= width_currency_range__slider_wrapper) ? 0 : width_currency_range__slider_wrapper - coordinateX}px`;
            currency_range__slider__selected_range.style.width = `${(coordinateX >= width_currency_range__slider_wrapper) ? width_currency_range__slider_wrapper : width_selected_range + (coordinateX - end_selected_range)}px`;
            direction = "right";
            currency_range__slider__selected_range.classList.add("move-right");
            currency_range__slider__selected_range.classList.add("click-right");

        }
        specify_active_dots(currency_range__slider__dot, currency_range__slider__selected_range);
        specify_range_value(currency_range__slider__selected_range, currency_range__slider__dot, width_currency_range__slider_wrapper)
    })

    //Change the width and position of the selected range element when the mousedown event occurs
    document.addEventListener("mousemove", (e) => {
        const left_currency_range__slider_wrapper = currency_range__slider_wrapper.getBoundingClientRect().left;
        const new_coordinateX = ((e.clientX - left_currency_range__slider_wrapper) < 0) ? 0 : (e.clientX - left_currency_range__slider_wrapper);
        const coordinateX = new_coordinateX - prev_coordinateX;
        prev_coordinateX = new_coordinateX;
        const start_selected_range = currency_range__slider__selected_range.offsetLeft;
        const width_selected_range = currency_range__slider__selected_range.offsetWidth;
        const end_selected_range = start_selected_range + width_selected_range;
        let current_position = {};
        let current_width = null;
        if (coordinateX > 0) {
            if (direction == "left" && width_selected_range > 6) {
                current_position = {
                    direction: "left",
                    value: (start_selected_range + coordinateX) >= end_selected_range - 6 ? end_selected_range - 6 : start_selected_range + coordinateX,
                };
                current_width = (width_selected_range - coordinateX) <= 6 ? 6 : width_selected_range - coordinateX;
                direction = (current_width == 6 && current_position.value < width_currency_range__slider_wrapper - 6) ? "right" : "left";
            }
            else if (direction == "right" && end_selected_range < width_currency_range__slider_wrapper) {
                current_position = {
                    direction: "right",
                    value: (end_selected_range + coordinateX) >= width_currency_range__slider_wrapper ? 0 : width_currency_range__slider_wrapper - (end_selected_range + coordinateX),
                };
                current_width = (width_selected_range + coordinateX + start_selected_range) >= width_currency_range__slider_wrapper ? width_currency_range__slider_wrapper - start_selected_range : width_selected_range + coordinateX;
                currency_range__slider__selected_range.classList.add("move-right");
                currency_range__slider__selected_range.classList.remove("move-left");
            }
        } else if (coordinateX < 0) {
            if (direction == "right" && end_selected_range >= start_selected_range) {
                current_position = {
                    direction: "right",
                    value: (end_selected_range + coordinateX) <= start_selected_range + 6 ? width_currency_range__slider_wrapper - start_selected_range - 6 : width_currency_range__slider_wrapper - end_selected_range - coordinateX,
                }
                current_width = (width_selected_range + coordinateX) <= 6 ? 6 : width_selected_range + coordinateX;
                direction = (current_width == 6 && current_position.value < width_currency_range__slider_wrapper - 6) ? "left" : "right";
            } else if (direction == "left" && start_selected_range > 0) {
                current_position = {
                    direction: "left",
                    value: (start_selected_range + coordinateX) < 1 ? 0 : start_selected_range + coordinateX,
                }
                current_width = (width_selected_range - coordinateX) >= end_selected_range ? end_selected_range : width_selected_range - coordinateX;
                currency_range__slider__selected_range.classList.remove("move-right");
                currency_range__slider__selected_range.classList.add("move-left");
            }
        }
        if (direction) {
            currency_range__slider__selected_range.style[current_position.direction] = `${current_position.value}px`;
            currency_range__slider__selected_range.style.width = `${current_width}px`;
            specify_active_dots(currency_range__slider__dot, currency_range__slider__selected_range);
            specify_range_value(currency_range__slider__selected_range, currency_range__slider__dot, width_currency_range__slider_wrapper)
        }

    })

    //Stop changing the width and position of the selected range element when the mousedown event occurs
    document.addEventListener("mouseup", () => {
        currency_range__slider__selected_range.classList.remove("click-right");
        currency_range__slider__selected_range.classList.remove("click-left");
        currency_range__slider__selected_range.classList.remove("move-left");
        currency_range__slider__selected_range.classList.remove("move-right");
        direction = null;
    })

}