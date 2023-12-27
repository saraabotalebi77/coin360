export default function fullscreenContent(fullscreen_btn) {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreen_btn.className = "fullscreen-btn d-xl-none d-flex justify-content-center align-items-center";
    document.body.className = "";
  } else {
    document.body.requestFullscreen();
    fullscreen_btn.className = "fullscreen-btn in-active d-xl-none d-flex justify-content-center align-items-center"
    document.body.className = "fullscreen";
  }
}