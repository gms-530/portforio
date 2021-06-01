let daytime = document.querySelector(".daytime");
let car = document.querySelector(".car");

addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    daytime.classList.toggle("moving");//toggle=交互に切り替える
    car.classList.toggle("suspention");
  }
})
