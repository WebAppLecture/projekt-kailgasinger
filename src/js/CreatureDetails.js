
import { CreatureDetailsDrawer } from "../../src/js/CreatureDetailsDrawer.js";
import { EggSparkAnim } from "../../src/js/BattleAnim.js";

export class CreatureDetails {

    constructor(pCreature, egg) {
        this.pCreature = pCreature;
        this.egg = egg;
        this.drawer = new CreatureDetailsDrawer(this.pCreature, this.egg);
        this.mode = "";
        this.Anims = [];
        this.progress = 0;
        this.timer = 0;
    }

    setCreature(pCreature) {
        this.pCreature = pCreature;
    }

    setEgg(egg) {
        this.egg = egg;
    }
    
    confirm(bool) {
        if (this.progress <= 2 && this.timer >= 160) {
            this.timer = 0;
            this.progress += 1*bool;
            console.log(this.progress);
        }
        return "details";
    }

    close(bool) {
        if (this.mode == "creature") {
            return "map";
        }
        else {
            return "details";
        }
    }

    draw(ctx) {
        this.drawer.drawBase(ctx);
        if (this.mode == "egg") {
            this.drawer.drawEgg(ctx, this.timer-25, Math.round(this.timer/120));
        }
        else if (this.mode == "hatch") {
            if (this.timer > 80) {
                this.Anims = [];
                this.drawer.drawCreature(ctx);
            }
            else {
                for (let i in this.Anims) {
                    this.drawer.drawEgg(ctx, this.timer, 0);
                    this.Anims[i].draw(ctx);
                }
            }
        }
        else if (this.mode == "creature") {
            this.drawer.drawCreature(ctx);
            this.drawer.drawString(ctx, "#000000", 100, 110, "Return to map? (B)", "middle", "middle", "16px monospace");
            this.drawer.drawCreatureStats(ctx);
        }
    }

    update(ctx) {
        this.timer++;
        if (this.mode == "hatch" && this.progress < 2) {
            for (let i in this.Anims) {
                this.Anims[i].update(ctx);
            }
        }
        else if (this.mode == "egg" && this.progress == 1) {
            this.setMode("hatch");
            this.hatchAnim();
        }
        else if (this.mode == "hatch" && this.progress >= 2) {
            this.setMode("creature");
        }
        return "details";
    }

    hatchAnim() {
        for (let i = 0; i<=40; i++) {
            this.Anims.push( new EggSparkAnim(180+40*Math.random(), 230+40*Math.random(), 5+Math.random()*10, 5+Math.random()*10, '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6), -4+Math.random()*8, -4+8*Math.random(), "Egg Sparks",0, 0));
        }
    }

    setMode(mode) {
        console.log(mode);
        this.mode = mode;
    }
}