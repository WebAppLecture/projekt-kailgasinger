import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
import { Battle } from "../../src/js/Battle.js";
import { Map } from "../../src/js/Map.js";
import { Start } from "../../src/js/Start.js";
import { LibCreature } from "../../src/js/LibCreature.js"
import { BattleCreature } from "../../src/js/BattleCreature.js"

//ToDo:     1) Aktivieren von Move berechnet erst Schaden und verrechnet, wählt dann Gegnermove.
//          2) Animation für Moves
//          3) Energy für Moves & Ki
//          4) Life, Exp, ...



export class PetFight extends GameTemplate {

    start() {
        this.map = new Map(10, 12,); // neue Karte muss hier erstellt werden!
        this.map.start();
        this.battle = new Battle(); // neues Kampfobjekt analog ;)

        // Block für Daten (Stats, Name, ...)
        // Treffquote, Critquote, Dodge, ...
        // Ende Datenblock

        if (this.mode === "battle") {

            // Direkt Battle
            this.player = {name: "Bla", sprite: "sealing.png"};
            this.playerstats = {health: 35, maxhealth: 35, energy:30, maxenergy:30, atk: 5, def: 3, spatk: 5, spdef: 4};
            this.playermoves = ["Fireball", "Fiery Breath", "Freeze", "Bite"];
            this.pCreature = new BattleCreature(0,300, 150, 150, "color", "player", this.player.name, this.player.sprite, this.playerstats, this.playermoves)
            // Ende direkt Battle

            this.battle.setup(this.pCreature);
            this.timer = 0;
        }
        else if (this.mode === "map") {
            this.map = new Map(10, 12,);
            this.map.start();
            console.log("beim Zeichnen der Map " + this.map.currentMapx)
        }
        else if (this.mode == "start") {
            this.start = new Start();
            this.start.setup
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
        else if (this.mode === "start") {
            if(this.startBinding.hasOwnProperty(type)) {
                let startUpdate = this.startBinding[type](active);
                if (typeof(startUpdate) == "string") {
                    console.log("Angekommen");
                    this.pCreature = LibCreature.GetCreature(startUpdate, 0, "player");
                    this.mode = "map";
                }
            }
        }
        else if (this.mode === "map") {
            if(this.mapBinding.hasOwnProperty(type)) {
                let mapUpdate = this.mapBinding[type](active);
                //console.log("mapupdate:" + mapUpdate);
                console.log("MapUpdates: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3]);
                if (mapUpdate && mapUpdate[0] === "startBattle") {
                    this.mode = "battle";
                    this.timer = 0;
                    this.battle.setup(this.pCreature, mapUpdate[1]);              
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
            this.startBinding = {  
                "up": (bool) => this.start.switchEgg(bool,-4, this.mode),
                "right": (bool) => this.start.switchEgg(bool,3, this.mode),
                "left": (bool) => this.start.switchEgg(bool,+3, this.mode),
                "down": (bool) => this.start.switchEgg(bool,4, this.mode),
                "primary": (bool) => this.start.confirm(bool),
            };
    }

   
    update(ctx) {
        if (this.mode == "battle"){
            this.mode = this.battle.updateBattle(ctx);  // Bekommt Kampfende zurück!
        } else if  (this.mode === "map") {
            
        }
        else if  (this.mode === "start") {
            this.start.update(ctx);
        }
    }
    

    // Battle (if this.mode == "battle") => this.battle.draw(ctx)!
    draw(ctx) {
        if (this.mode == "battle") {
            this.battle.draw(ctx);
        }
        else if (this.mode == "map") {
            this.map.draw(ctx);
        }
        else if (this.mode == "start") {
            this.start.draw(ctx);
        }
    }

    heal() {
        this.playerstats.health = this.playerstats.maxhealth;
    }

    static get MODES() {
        return [
            {
                NAME:"New Game",
                parameters: {
                    "mode": "start",
                },
            },{
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


