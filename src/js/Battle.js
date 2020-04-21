import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
import { Menu } from "../../vendor/gamebox/src/js/Menu.js";
import { GameObject, MovableGameObject, Ball, Mode } from "../../vendor/gamebox/src/js/GameObject.js";
import { BattleDrawer } from "../../src/js/BattleDrawer.js";
import { BattleCreature } from "./BattleCreature.js";
import { LibMove } from "../../src/js/LibMove.js";

/* Fragen Louis:
1)  Canvas&Css Interaktion/ how to use Css tricks (animations,...) in ctx
2) Wdh Daten holen: Mein Projekt arbeitet mit Daten die geladen werden sollen - wie geschickt (Units, Moves)
3) ColorBug??? (vgl. FallingStones)

Neon Apeheute um 09:08 Uhr
1) geht nicht
2) Stilfrage, geht beides
3) die shadow eigenschaften müssen vor der Fill methode des objects aufgerufen werden, sonst gelten sie erst fürs nächste objekt


Adiheute um 09:11 Uhr
Hm, ok.
Aber dann weiß ich nicht so recht wo wir css gut unterbringen sollen.... die GameBox ist ja bereits vorgegeben und aktuell verwenden wir HTML5 canvas zum Zeichnen (auch von AttackAnimations, da gibt es schon zwei :P)
Zu 2) Wäre das i.O. wenn wir eine static Data haben?
Damit könnte ich schneller loslegen als wenn wir uns erst in .json einlesen müssen (ich erinner mich an die Vl dazu, aber wir haben eben selbst noch nicht damit gearbeitet...)
Zu 3) heißt das ich muss für alle meine GameObjects shadow setzen um den Bug abzufangen?


Neon Apeheute um 11:06 Uhr
1) ein guter Skin für die Gamebox reichts als CSS für die abgabe. 
2) json ist javascript, du kannst einfach objekte wie in javascript in json schreiben und fertig. laden über fetch wie im projekt starter code. Aber statische Data klassen gehen genauso.
3) Wenn du deine GameObjects von meinen erben lässt, nein. Du musst nur in Gameobject das setzten der shadow eigenschaften über die fill methode setzten

Eigenes:
1)  Alles Draw in BattleDrawer?
*/

export class Battle {

    setup(player, playerstats, playermoves, enemy, enemystats, enemymoves) {

        // es existiert ein BattleCreatureObject - da soll alles rein!
        this.playermoves = playermoves;
        this.pCreature = new BattleCreature(0,300, 150, 150, "color", "player", player.name, player.sprite, playerstats, playermoves);
        this.player = player;
        
        // analog dem Playerkommentar:
        this.enemy = enemy;
        this.enemymoves = enemymoves;
        this.eCreature = new BattleCreature(250,10, 150, 150, "color", "enemy", enemy.name, enemy.sprite, enemystats, enemymoves);

        this.playermoves.active = 0;
        this.drawer = new BattleDrawer();

        this.dmg = 0;
        this.dmgTxt = "";
    }

    navMoves(bool, value, mode) {
        if (mode == "battle") {
            this.playermoves.active += value*bool+4;    // Für %-Navigation: Brilliant oder was?
            this.playermoves.active %=4;    //Nach letztem Move von vorn :)
            console.log(this.playermoves.active);
        }
    }

    execPAttack(move) {
        this.execAttack(move, this.pCreature, this.eCreature, 1, -1, 95, 30);
    }

    // neue Fn. für beide Kreaturen:
    execAttack(move, caster, aim, vx, vy, xOff, yOff) {
        let moveSpecs = LibMove.GetMove(move);  // Enthält Power, Offsets, ...
        console.log(moveSpecs);
        let dmg = this.calcDmg(move, caster, aim);
        this.dmgTxt = this.getDmgText(dmg[0]);
        this.dmg = dmg[1];
        this.drawer.drawAnim(move, dmg[0], caster.x+xOff, caster.y+yOff, vx, vy);
        aim.stats.health -= this.dmg;
        caster.stats.energy -= 3;   // ersetzen
    }

    execEnemyMoves() {  // Noch keine Energie bisher! Zusammenfassen mit execAttack und bessere Stringfn.!!!
        this.enemyMoveNr = Math.floor(this.eCreature.moves.length*Math.random());
        console.log(this.eCreature.moves[this.enemyMoveNr]);
        this.execAttack(this.eCreature.moves[this.enemyMoveNr], this.eCreature, this.pCreature, -1.2, 1, -20, 20);
    }
    // Ende der zukünftig einen Funktion!

    calcDmg(move, caster, aim) {
        //Eigentlich switch move (und dann Schaden berechnen), grob:
        let dmg = [];
        dmg[0] = 0.5 + Math.random();   //"Crit/ Fail"
        dmg[1] = Math.round(((caster.stats.atk/aim.stats.def) +2 )*5*dmg[0]);    //dmg
        console.log(dmg);
        return dmg;
    }

    refresh(timer, ctx, mode) {    // Auch Ausgang des Kampfes wird hier festgestellt!
        // Update Anims:
        this.updateAnims(ctx);
        if ((timer >= 160) && (mode == "battleAnim")) {
            this.delAnims();
            this.execEnemyMoves();
            return "enemyBattleAnim";
        }
        else if ((timer >= 160) && (mode == "enemyBattleAnim")) {
            this.delAnims();
            return "battle";
        }
        else if ((timer < 160) && (mode == "battleAnim")) {
            return "battleAnim";
        }
        else {
            return "enemyBattleAnim";
        }
    }

    updateAnims(ctx) {
        this.drawer.updateAnims(ctx);
    }

    delAnims() {
        this.drawer.attackAnims = [];
    }

    drawCombatLog(ctx, user) {
        if (user == "player") {
            this.drawer.drawString(ctx, "#000000", 5, 455, this.player.name+" used "+this.playermoves[this.playermoves.active], "left","middle", "20px monospace");
            this.drawer.drawString(ctx,"#000000", 5, 475, this.dmgTxt+" and caused "+this.dmg+" damage.", "left","middle", "14px monospace");    
        }
        else if (user == "enemy") {
            this.drawer.drawString(ctx, "#000000", 5, 455, this.enemy.name+" used "+this.eCreature.moves[this.enemyMoveNr], "left","middle", "20px monospace");
            this.drawer.drawString(ctx,"#000000", 5, 475, this.dmgTxt+" and caused "+this.dmg+" damage.", "left","middle", "14px monospace");   
        }
        for (let x in this.drawer.attackAnims) {
            this.drawer.attackAnims[x].draw(ctx);
        }
    }

    drawMovesBackgr(ctx) {      // Eine Fn. zum REchteck zeichen (Farbe, Maße)
        this.drawer.drawBox(ctx, "#828C78", -1, 441, ctx.canvas.width, 60);
    }

    drawMovesMenu(ctx) {
        for (let x in this.playermoves) {
            let color = "#000000";
            if (this.playermoves.active == x) {
                color = "#49D615"
            }
            let y = Math.round(x/2-0.1);
            this.drawer.drawString(ctx, color, 125+120*(x%2 -1), 455+(y%2)*15, this.playermoves[x])
        }
    }

    drawMoves(ctx) {
        //this.drawMovesBackgr(ctx);
        //this.drawNames(ctx, this.player.name, this.enemy.name);
        this.drawMovesMenu(ctx);
    }

    drawHealth(ctx) {
        //Spieler:
        this.drawer.drawBox(ctx, "#C81D1A", 101, 410, 200, 14); //Maxhealth
        this.drawer.drawBox(ctx, "#25DE0F", 102, 411, 199*(this.pCreature.stats.health/this.pCreature.stats.maxhealth) -1, 12);

        //Enemy:
        this.drawer.drawBox(ctx, "#C81D1A", 97, 8, 200, 14);
        this.drawer.drawBox(ctx, "#25DE0F", 98+199*(1-this.eCreature.stats.health/this.eCreature.stats.maxhealth), 9, 199*(this.eCreature.stats.health/this.eCreature.stats.maxhealth) -1, 12); 
    }

    drawEnergy(ctx) {
        //Spieler:
        this.drawer.drawBox(ctx, "#211D26", 101, 425, 200, 14); //MaxEn
        this.drawer.drawBox(ctx, "#1B6BEF", 102, 426, 199*(this.pCreature.stats.energy/this.pCreature.stats.maxenergy) -1, 12);

        //Enemy:
        this.drawer.drawBox(ctx, "#211D26", 97, 23, 200, 14);
        this.drawer.drawBox(ctx, "#1B6BEF", 98+199*(1-this.eCreature.stats.energy/this.eCreature.stats.maxenergy), 24, 199*(this.eCreature.stats.energy/this.eCreature.stats.maxenergy) -1, 12);
    }

    drawNames(ctx, pName, eName) {  // AUslagern:P => done!
        // Spieler:
        this.drawer.drawBox(ctx, "#828C78", -1, 410, 100, 29);
        this.drawer.drawString(ctx, "#000000", 10, 425, pName);

        // Gegner:
        this.drawer.drawBox(ctx, "#828C78", 300, 8, 100, 29);
        this.drawer.drawString(ctx, "#000000", 310, 20, eName);
    }

    // All Time Drawer:
    drawBattle(ctx) {
        this.drawMonsters(ctx);
        this.drawMovesBackgr(ctx);
        this.drawHealth(ctx);
        this.drawEnergy(ctx);
        this.drawNames(ctx, this.pCreature.name, this.eCreature.name);
    }

    drawMonsters(ctx) {
        //Auslagern:    Spielermonster (durch Sprite ersetzen!)
        /*
        ctx.fillStyle = "#10C47D"
        ctx.beginPath();
        ctx.moveTo(10, 480);
        ctx.lineTo(110,420);
        ctx.lineTo(120,405);
        ctx.lineTo(20, 300);
        ctx.closePath(200, 99);
        ctx.fill();
        */
       this.pCreature.draw(ctx);

        //Auslagern:    Gegnermonster (durch Sprite ersetzen!)
        /*
        ctx.fillStyle = "#D62F15"
        ctx.beginPath();
        ctx.moveTo(290, 80);
        ctx.lineTo(330,3);
        ctx.lineTo(420,3);
        ctx.lineTo(450, 58);
        ctx.lineTo(310, 100);
        ctx.closePath(390, 99);
        ctx.fill();
        */
       this.eCreature.draw(ctx);
    }

    //getter:
    getDmgText(val) {
        if (val <= 0.7) {
            return "It nearly missed";
        }
        else if (val <= 1.0) {
            return "It performed normally";
        }
        else if (val <= 1.35) {
            return "It hit nicely";
        }
        else {
            return "It landed a critical hit";
        }
    }
}
