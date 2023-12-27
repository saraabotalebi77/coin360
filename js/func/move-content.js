// keep track of user's mouse down and up
let isPressedDown = false;
// The horizontal or vertical position of cursor from slider
let cursorStartPosition = {
    x: null,
    y: null,
};
// Specify the value of top and left property
let x = 0;
let y = 0;
// stop moving 
function stop_moving(cryptoCurrencies) {
    cryptoCurrencies.classList.remove("start-moving");
    isPressedDown = false;
}
// move origin content 
function moving(cryptoCurrencies, cursorCurrentPosition) {
    let top_position__cryptoCurrencies = cryptoCurrencies.offsetTop;
    let left_position__cryptoCurrencies = cryptoCurrencies.offsetLeft;
    let width__cryptoCurrencies_wrapper = cryptoCurrencies.parentElement.offsetWidth;
    let height__cryptoCurrencies_wrapper = cryptoCurrencies.parentElement.offsetHeight;
    let width__cryptoCurrencies = cryptoCurrencies.offsetWidth;
    let height__cryptoCurrencies = cryptoCurrencies.offsetHeight;

    if (isPressedDown) {
        cryptoCurrencies.classList.add("start-moving");
        if (cursorCurrentPosition.x - cursorStartPosition.x != 0) {
            x = left_position__cryptoCurrencies + cursorCurrentPosition.x - cursorStartPosition.x;
            x = x > 0 ? 0 : x < (width__cryptoCurrencies_wrapper - width__cryptoCurrencies) ? width__cryptoCurrencies_wrapper - width__cryptoCurrencies : x;
            cryptoCurrencies.style.left = `${x}px`;
        }
        if (cursorCurrentPosition.y - cursorStartPosition.y != 0) {
            y = top_position__cryptoCurrencies + (cursorCurrentPosition.y - cursorStartPosition.y);
            y = y > 0 ? 0 : y < (height__cryptoCurrencies_wrapper - height__cryptoCurrencies) ? height__cryptoCurrencies_wrapper - height__cryptoCurrencies : y;
            cryptoCurrencies.style.top = `${y}px`;
        }
    }
}
export default function moveContent(cryptoCurrencies) {

    cryptoCurrencies.addEventListener("mousedown", (e) => {
        isPressedDown = true;
        cursorStartPosition.x = e.clientX - cryptoCurrencies.offsetLeft;
        cursorStartPosition.y = e.clientY - cryptoCurrencies.offsetTop;
    })
    cryptoCurrencies.querySelectorAll(".cryptoCurrency-link").forEach(currency=>{
        currency.addEventListener("mousedown",(e)=>{
            e.preventDefault()
        })
        currency.addEventListener("touchstart",(e)=>{
            e.preventDefault()
        })
    })
    cryptoCurrencies.addEventListener("mousemove", (e) => {
        let cursorCurrentPosition = {
            x: e.clientX - cryptoCurrencies.offsetLeft,
            y: e.clientY - cryptoCurrencies.offsetTop,
        };
        moving(cryptoCurrencies, cursorCurrentPosition);
    })
    cryptoCurrencies.addEventListener("mouseup", (e) => {
        stop_moving(cryptoCurrencies)
    })
    cryptoCurrencies.addEventListener("mouseleave", () => {
        stop_moving(cryptoCurrencies)
    })
    cryptoCurrencies.addEventListener("touchstart", (e) => {
        isPressedDown = true;
        cursorStartPosition.x = e.touches[0].clientX - cryptoCurrencies.offsetLeft;
        cursorStartPosition.y = e.touches[0].clientY - cryptoCurrencies.offsetTop;
    })
    cryptoCurrencies.addEventListener("touchmove", (e) => {
        let cursorCurrentPosition = {
            x: e.touches[0].clientX - cryptoCurrencies.offsetLeft,
            y: e.touches[0].clientY - cryptoCurrencies.offsetTop,
        };
        moving(cryptoCurrencies, cursorCurrentPosition);
    })
    cryptoCurrencies.addEventListener("touchend", (e) => {
        stop_moving(cryptoCurrencies);
        
    })
    
   

}