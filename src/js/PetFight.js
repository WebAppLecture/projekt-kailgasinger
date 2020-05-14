import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
import { Battle } from "../../src/js/Battle.js";
import { Map } from "../../src/js/Map.js";
import { Start } from "../../src/js/Start.js";
import { LibCreature } from "../../src/js/LibCreature.js"
import { MapMenu } from "../../src/js/MapMenu.js"
import { CreatureDetails } from "../../src/js/CreatureDetails.js";

// CreatureDetails malt noch negatives Leben!


export class PetFight extends GameTemplate {

    start() {
        this.map = new Map(10, 12,); // Karte wird am Anfang immer erstellt!
        this.map.start();   // Karte initialisieren
        this.battle = new Battle(); // neues Kampfobjekt analog ;)
        this.MapMenu = new MapMenu();   // Menü
        this.details = new CreatureDetails();   // Details für Eggs/ Pets/ ...

        if (this.mode === "battle") {   // Wenn Direktbattle im Startmenu gewählt wurde
            // Direkt Battle
            this.playerstats = {health: 35, maxhealth: 35, energy:30, maxenergy:30, atk: 5, def: 3, spatk: 5, spdef: 4};    //Proxy Stats
            this.playermoves = ["Fireball", "Fiery Breath", "Freeze", "Bite"];  // Proxy Moves
            this.pCreature = LibCreature.GetCreature("Thunderstriker", 0, "player");    // Proxy Creature

            this.battle.setup(this.pCreature);  // Erstelle Proxy Enemycreature
            this.timer = 0;
        }
        else if (this.mode === "map") {
        }
        else if (this.mode === "MapMenu") {
            this.MapMenu.start();
        }
        else if (this.mode === "start") {   // "New Game Mode" / egg_selection!
            this.start = new Start();
            this.start.setup
        }
    }

    input(type, active) {
        if(this.gameOver && type === "primary") {   // klassischer GameOver noch nicht realisiert.
            this.start();   
            this.bindControls();  
        }
        if(this.mode === "battle"){ // Eigene Bindings fürs Battle (Move Navigation,...)
            if(this.battleBinding.hasOwnProperty(type)) {
                this.battleBinding[type](active);
            }
        }
        else if (this.mode === "start") {   // Bindings für NewGame, 
            if(this.startBinding.hasOwnProperty(type)) {
                let startUpdate = this.startBinding[type](active);
                if (typeof(startUpdate[0]) === "object") {   // Start-Story gibt zurück wenn sie fertig ist, => Gehe in CreatureDetails
                    this.pCreature = startUpdate[0];
                    this.details = new CreatureDetails(this.pCreature, startUpdate[1]);
                    this.details.setMode("egg");
                    this.mode = "details";
                }
            }
        }
        if(this.mode === "MapMenu"){    //Menüsteuerung
            if(this.menuBinding.hasOwnProperty(type)) {
                let mapUpdate = this.menuBinding[type](active); // Analog startBinding
                if (mapUpdate){
                    this.mode = mapUpdate[0];
                    if (mapUpdate[0] === "details") {
                        this.details.mode = "creature";
                    }
                }
            }
        }
        else if (this.mode === "map") {     //Map-Steuerung
            if(this.mapBinding.hasOwnProperty(type)) {
                let mapUpdate = this.mapBinding[type](active);  // Analog den oberen, wenn die Mapcontrols "startBattle" zurückgeben wir ein Fight initialisiert.
                if (mapUpdate && mapUpdate[0] === "startBattle") {
                    this.mode = "battle";
                    this.battle.setup(this.pCreature, mapUpdate[1]);              
                }
                else if (mapUpdate && mapUpdate[0] === "healer") {  // Collision HealObjekt
                    this.heal();
                }
                // wird ein Feld betreten, dass eine neue Map aufruft, wird sie hier erstellt
                if (mapUpdate && mapUpdate[0] === "nextMap"){
                    this.map = new Map(mapUpdate[1], mapUpdate[2], mapUpdate[3], mapUpdate[4]);
                    this.map.start();
                }
            }
        }    
        else if (this.mode === "details") {     // Controls für CreatureDetails
            if(this.detailsBinding.hasOwnProperty(type)) {
                this.mode = this.detailsBinding[type](active);
            }
        } 
        // else if (this.mode === "miniMap") {
        //     this.map.startMiniMap();
        // }
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
                "secondary": (bool) => {                
                    this.mode = "MapMenu";
                }
            };
            this.menuBinding = {  
                "up": (bool) => this.MapMenu.navMenu(bool,-2, this.mode),
                "right": (bool) => this.MapMenu.navMenu(bool,1, this.mode),
                "left": (bool) => this.MapMenu.navMenu(bool,-1, this.mode),
                "down": (bool) => this.MapMenu.navMenu(bool,2, this.mode),
                "primary": (bool) => this.MapMenu.selectMenuObject(bool),
                //"secondary": (bool) => this.MapMenu.closeMapMenu(),   // WIP bzw. Nicht mehr benutzt
            };
            this.startBinding = {  
                "up": (bool) => this.start.switchEgg(bool,-4, this.mode),
                "right": (bool) => this.start.switchEgg(bool,3, this.mode),
                "left": (bool) => this.start.switchEgg(bool,+3, this.mode),
                "down": (bool) => this.start.switchEgg(bool,4, this.mode),
                "primary": (bool) => this.start.confirm(bool),
            };
            this.detailsBinding = {  
                "up": (bool) => this.details.nav(bool,-2, this.mode),
                "right": (bool) => this.details.nav(bool,1, this.mode),
                "left": (bool) => this.details.nav(bool,-1, this.mode),
                "down": (bool) => this.details.nav(bool,2, this.mode),
                "primary": (bool) => this.details.confirm(bool),
                "secondary": (bool) => this.details.close(bool),
            };
    }

   
    update(ctx) {   //regelt update() für die verschiedenen "Modes"
        if (this.mode == "battle"){
            this.mode = this.battle.updateBattle(ctx);  // Bekommt Kampfende zurück!
        } else if  (this.mode === "map") {
            
        }
        else if  (this.mode === "start") {
            this.start.update(ctx);
        }
        else if  (this.mode === "details") {
           this.mode =  this.details.update(ctx);
        }
    }
    

    draw(ctx) {     //regelt draw() für die verschiedenen "Modes"
        if (this.mode === "battle") {
            this.battle.draw(ctx);
        }
        else if (this.mode === "map") {
            this.map.draw(ctx);
        }
        else if (this.mode === "MapMenu") {
            this.map.draw(ctx);
            this.MapMenu.draw(ctx);
        }
        // else if (this.mode === "miniMap") {
        //     this.map.draw(ctx);
        //     this.MapMenu.draw(ctx);
        //     this.miniMap.drawMiniMap(ctx);
        //}
        else if (this.mode === "start") {
            this.start.draw(ctx);
        }
        else if (this.mode === "details") {
            this.details.draw(ctx);
        }
    }


    heal() {    //Aktuell noch hier, WIP (wird getriggert bei Collision mit HealObjekt auf Map)
        this.pCreature.stats.health = this.pCreature.stats.maxhealth;
    }

    static get MODES() {
        return [
            {
                NAME:"Start New Game",
                parameters: {
                    "mode": "start",
                },
            },{
                NAME:"battle (debug)", 
                parameters: {
                    "mode": "battle",
                },
            },{
                NAME: "map (debug)", 
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