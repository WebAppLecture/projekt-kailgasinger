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
        if (this.mode == "battle") {

            // Block für Daten (Stats, Name, ...)
            // Treffquote, Critquote, Dodge, ...
            this.player = {name: "Bla", health: 35, maxhealth: 35, energy:30, maxenergy:30, atk: 5, def: 3, spatk: 5, spdef: 4};
            this.playermoves = ["Fireball", "Punch", "Sparky Breath", "Bite"];
            let enemy = {name: "Keili", health: 117, maxhealth: 125, energy:10, maxenergy:22, atk: 3, def: 3, spatk: 2, spdef: 4};
            let enemymoves = ["Clawstrike", "Fireball", "Sparky Breath", "Bite"];
            // Ende Datenblock

            this.battle = new Battle();
            this.battle.setup(this.player, this.playermoves, enemy, enemymoves);
            this.timer = 0;
        }
        else {
            this.map = new Map(500, 500, "testmap");
            this.map.start();
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
                console.log("mapupdate:" + mapUpdate);
                if (mapUpdate && mapUpdate[0] == "startBattle") {
                    this.mode = "battle";
                    this.battlestart(mapUpdate[1]);              
                }

            }
        }
        
    }

    bindControls() {
        //if (this.mode === "battle") {
            this.battleBinding = {  
                "up": (bool) => this.battle.navMoves(bool,-2, this.mode),
                "right": (bool) => this.battle.navMoves(bool,1, this.mode),
                "left": (bool) => this.battle.navMoves(bool,-1, this.mode),
                "down": (bool) => this.battle.navMoves(bool,2, this.mode),
                "primary": (bool) => this.execAttack(),
            };
        //}
        //else {
            //Keili
            this.mapBinding = {
                "left": (bool) => bool ? this.map.playerMove(-1, 0) : false,
                "right": (bool) => bool ? this.map.playerMove(1, 0) : false,
                "up": (bool) => bool ? this.map.playerMove(0, -1) : false,
                "down": (bool) => bool ? this.map.playerMove(0, 1) : false,
            };
        //}
    }

    update(ctx) {
        // Timer hier checken (in update, viel einfacher!)
        if (this.mode == "battleAnim") {
            this.timer++;
            this.mode = this.battle.refresh(this.timer, ctx, this.mode);
                if (this.mode == "enemyBattleAnim") {
                    this.timer = 0;
                }
        }
        else if (this.mode == "battle") {
            this.timer +=1;
        }
        else if (this.mode == "enemyBattleAnim") {
            this.timer++;
            this.mode = this.battle.refresh(this.timer, ctx, this.mode);
        }
    }

    battlestart(enemyName) {

        // Block für Daten (Stats, Name, ...)
        this.player = {name: "Bla", health: 20, maxhealth:35, energy:30, maxenergy:35, atk: 5, def: 3, spatk: 5, spdef: 4};
        let enemy = {name: enemyName, health: 97, maxhealth:105, energy:20, maxenergy:20, atk: 3, def: 3, spatk: 2, spdef: 4};
        this.playermoves = ["Fireball", "Sparky Breath", "Heatshield", "Bite"];
        let enemymoves = ["Fireball", "Sparky Breath", "Dodge", "Bite"];
        // Ende Datenblock
        this.battle = new Battle(this.player, this.playermoves, enemy, enemymoves);
        this.battle.setup(this.player, this.playermoves, enemy, enemymoves);
        this.timer = 0;
        this.bindControls();
    }

    execAttack() {
        if (this.timer >= 10 && this.mode == "battle") {
            this.timer = 0;
            this.battle.execAttack(this.battle.playermoves[this.battle.playermoves.active]);
            this.mode = "battleAnim";
        }
    }

    draw(ctx) {
        if (this.mode == "battle") {
            this.battle.drawBattle(ctx);
            this.battle.drawMoves(ctx);
        }
        else if (this.mode == "battleAnim")  {
            this.battle.drawBattle(ctx);
            this.battle.drawCombatLog(ctx, "player");
        }
        else if (this.mode == "enemyBattleAnim") {
            this.battle.drawBattle(ctx);
            this.battle.drawCombatLog(ctx, "enemy");
        }
        else if (this.mode == "map") {
            this.map.draw(ctx);
        }
        ctx.fillText("Debug: "+this.mode+", Timer: "+this.timer, 10, 45);
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


