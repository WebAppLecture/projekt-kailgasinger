import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
import { Battle } from "../../src/js/Battle.js";
import { Map } from "../../src/js/Map.js";
// Import je nachdem was wir brauchen: => import { GameObject, MovableGameObject, Ball, Mode } from "../GameObject.js";

//Fragen:   1) Wie kann ich in Battle Class Zeichnen/ .... Battle extends GameTemplate wirft Fehler!
//          2) Tasten werfen "Multihits" - wie abfangen? (wurde schonmal besprochen)
//          3) Wie funzt das Menu? (Scrollrad& "active")
//          4) Bei Abändern von this.cd >= 10 höher (Abfangen von Multihits) Fehlermeldung

//ToDo:     1) Aktivieren von Move berechnet erst Schaden und verrechnet, wählt dann Gegnermove.
//          2) Animation für Moves
//          3) Energy für Moves & Ki
//          4) Life, Exp, ...



export class PetFight extends GameTemplate {

    start() {
        if (this.mode == "battle") {
            // In battle nur Rechnen?!?
            this.player = {name: "Bla", life: 35, energy:30, atk: 5, def: 3, spatk: 5, spdef: 4};
            let enemy = {name: "Ene", life: 25, energy:20, atk: 3, def: 3, spatk: 2, spdef: 4};
            this.playermoves = ["Fireball", "Punch", "Heatshield", "Bite"];
            this.playermoves.active=0;
            let enemymoves = ["Clawstrike", "Tailhit", "Dodge", "Bite"];
            this.battle = new Battle(this.player, this.playermoves, enemy, enemymoves);
            this.battle.fight();
            this.cd = 10;
        }
    }

    bindControls() {
        if (this.mode == "battle" && this.cd >= 10) {
            this.inputBinding = {  
                "up": () => this.playermoves.active -= 2,
                "right": () => this.playermoves.active += 1,
                "left": () => this.playermoves.active -= 1,
                "down": () => this.playermoves.active += 2,
                "wheel": () => this.changeActiveItem(event.wheelDelta),
            };
        }
        else {
            //Keili
        }
    }

    // Scroll Support for attack
    changeActiveItem(indexChange) {
        if(indexChange > 0) {
            let newActive = this.activeItem.previousElementSibling;
            this.activeItem = newActive || this.domElement.lastElementChild;
            
        } else {
            let newActive = this.activeItem.nextElementSibling;
            this.activeItem = newActive || this.domElement.firstElementChild;
        }
    }

    update() {
        this.cd +=1;
    }

    draw(ctx) {
        if (this.mode == "battle") {
            this.drawMoves(ctx);
        }
    }

    drawMoves(ctx) {
        //let y = 0;
        for (let x in this.playermoves) {
            ctx.fillStyle = "#6bd26b";
            if (this.playermoves.active == x) {
                ctx.fillStyle = "#000000"
            }
            let y = Math.round(x/2-0.1);
            ctx.font = "15px monospace";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(this.playermoves[x], (105+100*(x%2 -1)), 455+(y%2)*15);
        }
    }

    static get MODES() {
        return [
            {
                NAME:"battle", 
                parameters: {
                    "mode": "battle",
                },
            },{
                NAME: "map", 
                parameters: {
                    "mode": "map",
                },
            },
        ];
    }

    static get NAME() {
        return "PetFight";
    }

}


