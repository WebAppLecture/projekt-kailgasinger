import { GameEngine } from "./GameEngine.js";
import { SkinChanger } from "./SkinChanger.js";

window.gameEngine = new GameEngine(
    document.querySelector(".controls"), 
    document.querySelector(".screen"),
    document.querySelector(".menu"));


let skinStyle = document.querySelector("#skin"),
    skins = ["gold","peach","basic","win95", "mech", "scifi"];

window.skinChanger = new SkinChanger(skinStyle, skins, "../projekt-kailgasinger/src/css/");

document.querySelector(".next").addEventListener("click", () => skinChanger.next());
document.querySelector(".previous").addEventListener("click", () => skinChanger.previous());

skinChanger.activeSkin = "scifi";