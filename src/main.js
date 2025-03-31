import Phaser from "phaser";
import { VideoScene } from "./scenes/VideoScene";
import { FirstScene } from "./scenes/FirstScene";
import { SecondScene } from "./scenes/SecondScene";
import { CompareScene } from "./scenes/CompareScene";

let ratio = window.innerWidth / window.innerHeight;
let width = window.innerWidth;
let height = window.innerHeight;
if (ratio > 600 / 800) {
  width = (600 * window.innerHeight) / 800;
  height = window.innerHeight;
} else {
  width = window.innerWidth;
  height = (800 * window.innerWidth) / 600;
}
console.log(width, height);
width = 1.2 * 600;
height = 1.2 * 850;
console.log(width, height);

const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  scene: [VideoScene, FirstScene, SecondScene, CompareScene],
};

const game = new Phaser.Game(config);

const resize = (ev) => {
  let canvas = document.querySelector("canvas");
  if (canvas) {
    console.log("load");
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let winRatio = winWidth / winHeight;
    let gameRatio = game.scale.width / game.scale.height;

    if (winRatio > gameRatio) {
      let canvasWidth = (winHeight * 600) / 800;
      let canvasHeight = winHeight;
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
    } else {
      let canvasWidth = winWidth;
      let canvasHeight = (winWidth * 800) / 600;

      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
    }
  }
};
window.addEventListener("resize", () => {
  resize();
});
window.onload = () => {
  resize();
};
