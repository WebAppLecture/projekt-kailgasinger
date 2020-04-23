import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
import { Battle } from "../../src/js/Battle.js";
import { Map } from "../../src/js/Map.js";
// Import je nachdem was wir brauchen: => import { GameObject, MovableGameObject, Ball, Mode } from "../GameObject.js";

/*Fragen:   1) Wie kann ich in Battle Class Zeichnen/ .... Battle extends GameTemplate wirft Fehler!
                Geht!
//          2) Tasten werfen "Multihits" - wie abfangen? (wurde schonmal besprochen)
                Mit Bool (schon erledigt)
//          3) Wie funzt das Menu? (Scrollrad& "active")
                new "menu" (array& callback) verwenden
//          4) Bei Abändern von this.cd >= 10 höher (Abfangen von Multihits) Fehlermeldung
                erledigt

//ToDo:     1) Aktivieren von Move berechnet erst Schaden und verrechnet, wählt dann Gegnermove.
//          2) Animation für Moves
//          3) Energy für Moves & Ki
//          4) Life, Exp, ...

1) dazu miassade dein code seng, vermutlich wird da tick ned im gameLoop aafgruafa.
2) jeder input call aus der Gameengine hat 2 parameter. Type der die art der eingabe zeigt, und active, ein boolean der bei keydown true und keyup false ist. 
    Den kannst du überprüfen.
3) Du kannst selber einfach eine Instanz von Menu erstellen, die auf das gleiche menu element im HTML verweist, und die mit eigenen Inhalten laden.
4) Keine Ahnung warum das fehler wirft, aber so fängst du multihits nicht ab :wink: (siehe oben) 
    Zwecks Rundenbasiertem system: Du musst deine Änderungen eventbasiert machen und nicht kontinuierlich in update(). 
    Das sYstem braucht dann natürlich noch einen Stagemanager der die interaktionen in sinnvolle Wege leitet.

*/


export class PetFight extends GameTemplate {

    start() {
        this.map = new Map(10, 12,); // neue Karte muss hier erstellt werden!
        this.map.start();
        this.battle = new Battle(); // neues Kampfobjekt analog ;)

        // Block für Daten (Stats, Name, ...)
        // Treffquote, Critquote, Dodge, ...
        this.player = {name: "Bla", sprite: "sealing.png"};
        this.playerstats = {health: 35, maxhealth: 35, energy:30, maxenergy:30, atk: 5, def: 3, spatk: 5, spdef: 4};
        this.playermoves = ["Fireball", "Fiery Breath", "Freeze", "Bite"];
        // Ende Datenblock

        if (this.mode === "battle") {

            this.battle.setup(this.player, this.playerstats, this.playermoves);
            this.timer = 0;
        }
        else {
            this.map = new Map(10, 12,);
            this.map.start();
            console.log("beim Zeichnen der Map " + this.map.currentMapx)
        }
    }

    input(type, active) {
        if(this.gameOver && type === "primary") {
            this.start();   
            this.bindControls();  
        }
        if(this.mode === "battle"){
            if(this.battleBinding.hasOwnProperty(type)) {
                this.battleBinding[type](active);
            }
        }
        else{
            if(this.mapBinding.hasOwnProperty(type)) {
                
                let mapUpdate = this.mapBinding[type](active);
                //console.log("mapupdate:" + mapUpdate);
                console.log("MapUpdates: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3]);
                if (mapUpdate && mapUpdate[0] === "startBattle") {
                    this.mode = "battle";
                    this.timer = 0;
                    this.battle.setup(this.player, this.playerstats, this.playermoves, mapUpdate[1]);              
                }
                else if (mapUpdate && mapUpdate[0] === "healer") {
                    this.heal();              
                }
                // wird ein Feld betreten, dass eine neue Map aufruft, wird sie hier erstellt
                if (mapUpdate && mapUpdate[0] === "nextMap"){
                    //console.log("MapUpdates: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3]);
                    this.map = new Map(mapUpdate[1], mapUpdate[2], mapUpdate[3], mapUpdate[4]);
                    this.map.start();
                }
            }
        }        
    }

    bindControls() {
            this.battleBinding = {  
                "up": (bool) => this.battle.navMoves(bool,-2, this.mode),
                "right": (bool) => this.battle.navMoves(bool,1, this.mode),
                "left": (bool) => this.battle.navMoves(bool,-1, this.mode),
                "down": (bool) => this.battle.navMoves(bool,2, this.mode),
                "primary": (bool) => this.battle.ExecAttack(),
            };
            this.mapBinding = {
                "left": (bool) => bool ? this.map.playerMove(-1, 0) : false,
                "right": (bool) => bool ? this.map.playerMove(1, 0) : false,
                "up": (bool) => bool ? this.map.playerMove(0, -1) : false,
                "down": (bool) => bool ? this.map.playerMove(0, 1) : false,
            };
    }

   
    update(ctx) {
        if (this.mode == "battle"){
           // console.log("Update!");
            this.mode = this.battle.updateBattle(ctx);  // Bekommt Kampfende zurück!
        } else {
            console.log(this.mode);
        }
    }
    

    // Battle (if this.mode == "battle") => this.battle.draw(ctx)!
    draw(ctx) {
        if (this.mode == "battle") {
            //console.log("Draw!");
            this.battle.draw(ctx);
        }
        else if (this.mode == "map") {
            //console.log("Auf Karte?!?");
            this.map.draw(ctx);
        }
    }

    heal() {
        this.playerstats.health = this.playerstats.maxhealth;
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


