import { BattleDrawer } from "../../src/js/BattleDrawer.js";
import { LibMove } from "../../src/js/LibMove.js";
import { LibCreature } from "../../src/js/LibCreature.js"; 

export class Battle {

    setup(pCreature, enemyName) {

        delete this.eCreature;  // del old creature, check for new
        this.pCreature = pCreature;
        this.playermoves = this.pCreature.moves;
        this.player = {name: this.pCreature.name, sprite:this.pCreature.sprite};
        
        
        // Randomisation for Testbattles
        if (!enemyName) {
            let randCreature = ["Bad Rabbit", "Thunderstriker", "Zapderyx", "Flameling", "Ashfalom"];
            enemyName = randCreature[Math.round(Math.random()*(randCreature.length-1))];
        }

        this.eCreature = LibCreature.GetCreature(enemyName, 1);

        this.playermoves.active = 0;
        this.drawer = new BattleDrawer(this.pCreature, this.eCreature);

        this.dmg = 0;
        this.dmgTxt = "";

        this.mode = "battle";
        this.step = "battle";
        this.timer = 0;
    }

    ExecAttack() {
        if (this.timer >= 10 && this.step == "battle") {
            this.timer = 0;
            this.step = "Anim";
            this.nextStep = "enemy";
            this.execPAttack(this.playermoves[this.playermoves.active]);
        }
    }   

    updateBattle(ctx) {
        //ctx.fillText("Debug M: "+this.mode+",Step:"+this.step+" Timer: "+this.timer, 10, 45);     // Alter BattleDebug (Timer für Anims und co.) möchte ich bei Bedarf wieder rein, daher dieser Kommi
        this.timer +=1;
        this.updateAnims(ctx);

        if (this.step == "battle") {

        }
        else if (this.step == "Anim" && this.timer >= 170) {
            this.delAnims();
            if (!this.nextStep) {
                this.nextStep == "battle";
            }
            this.step = this.nextStep;
            this.timer = 0;
        }
        else if (this.step == "enemy") {
            this.execEnemyMoves();
            this.step = "Anim";
            this.nextStep = "battle";
        }
        else if (this.step == "map") {
            return "map";
        }
        console.log(this.mode);
        return this.mode;
    }

    draw(ctx) {
        this.drawer.drawBattle(ctx);

        if (this.step === "battle") {
            this.drawer.drawMoves(ctx, this.playermoves, this.playermoves.active, 125, 455);
        }
        else if (this.step == "Anim")  {
            this.drawCombatLog(ctx, this.nextStep);
        }
    }

    navMoves(bool, value, mode) {
        if (mode == "battle") {
            this.playermoves.active += value*bool+4;    // Für %-Navigation: Brilliant oder was?
            this.playermoves.active %=4;    //Nach letztem Move von vorn :)
        }
    }

    execPAttack(move) {
        this.execAttack(move, this.pCreature, this.eCreature, 1, -1, 95, 30);
    }

    execEnemyMoves() {  // Noch keine Energieprüfung bisher, Alle ANgriffe ziehen einfach nur optisch etwas Energie ab.
        this.enemyMoveNr = Math.floor(this.eCreature.moves.length*Math.random());
        console.log(this.eCreature.moves[this.enemyMoveNr]);
        this.execAttack(this.eCreature.moves[this.enemyMoveNr], this.eCreature, this.pCreature, -1.2, 1, -20, 20);
    }

    // Evaluiert Attacke
    execAttack(move, caster, aim, vx, vy, xOff, yOff) {
        let moveSpecs = LibMove.GetMove(move);  // Enthält Power, Offsets, ... werden aber noch nicht alle verwendet.
        console.log(moveSpecs);
        let dmg = this.calcDmg(move, caster, aim);
        this.dmgTxt = this.getDmgText(dmg[0]);
        this.dmg = dmg[1];
        this.drawer.drawAnim(move, dmg[0], caster.x+xOff, caster.y+yOff, vx, vy);
        aim.stats.health -= this.dmg;
        this.checklife(caster, aim);    // Mgl.weise Angriffe die eigenes Leben schädigen!
        caster.stats.energy -= 3;   // ersetzen und Prüfen! (check_energy-Fn.)
    }

    checklife (pCreature, eCreature) {
        if (this.pCreature.stats.health <= 0) { // Spieler verliert -> Hier sollte dann ein GameOver kommen (temporär - langfristig natürlich nicht)!
            this.step = "Anim";
            this.nextStep = "map";
        }
        if (this.eCreature.stats.health <= 0) { // GegnerBesiegt!
            this.step = "Anim";
            this.nextStep = "map";
        }
    }

    calcDmg(move, caster, aim) {
        //Eigentlich eigene Formulas für die Moves, grob:
        let dmg = [];
        dmg[0] = 0.5 + Math.random();   //"Crit/ Fail"
        dmg[1] = Math.round(((caster.stats.atk/aim.stats.def) +2 )*5*dmg[0]);    //dmg
        return dmg;
    }

    updateAnims(ctx) {
        this.drawer.updateAnims(ctx);
    }

    delAnims() {
        this.drawer.attackAnims = [];
    }

    drawCombatLog(ctx, user) {  // verbesserbar - das ist noch die primäre Implementierung:
        if (user == "enemy") {
            this.drawer.drawString(ctx, "#000000", 5, 455, this.player.name+" used "+this.playermoves[this.playermoves.active], "left","middle", "20px monospace");
            this.drawer.drawString(ctx,"#000000", 5, 475, this.dmgTxt+" and caused "+this.dmg+" damage.", "left","middle", "14px monospace");    
        }
        else if (user == "battle") {
            this.drawer.drawString(ctx, "#000000", 5, 455, this.eCreature.name+" used "+this.eCreature.moves[this.enemyMoveNr], "left","middle", "20px monospace");
            this.drawer.drawString(ctx,"#000000", 5, 475, this.dmgTxt+" and caused "+this.dmg+" damage.", "left","middle", "14px monospace");   
        }
        else if (user == "map") {
            this.drawer.drawString(ctx, "#000000", 5, 455, "You won the fight!", "left","middle", "20px monospace");
            this.drawer.drawString(ctx,"#000000", 5, 475, "Earned "+this.eCreature.getXp+" Experience.", "left","middle", "14px monospace"); 
        }
        for (let x in this.drawer.attackAnims) {
            this.drawer.attackAnims[x].draw(ctx);
        }
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
