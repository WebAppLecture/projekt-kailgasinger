import { BasicDrawer } from "../../src/js/BasicDrawer.js";

export class Start extends BasicDrawer {

    constructor() {
        super();
        this.eggs = ["aeria", "ignis", "fulgur", "aqua", "terra", "tenebris"];
        this.creatures = ["Zapderyx", "Flameling", "Thunderwalker", "Sealing", "Rockmaul", "Shadeling"];
        this.eggC = 0;
        this.activeEgg = -1;

        this.story = ["  Welcome to PetFight!_Press (A) to continue,>", 
                      " Congrats, you pressed (A)!_In PetFight you are going to raise Pets to_let them fight on your behalf. (A)>", 
                      " In order to train pets, you have to collect_and hatch eggs._Let`s look at some eggs I already found for_you!>",
                      " This is a 'Aeria'-Egg0,_a Pet with affinity for the element_Aeria (air) will hatch from it>",
                      " Let`s examine some more eggs:_I also found_'Ignis' (fire)0,>",
                      " 'Fulgur' (thunder)0>",
                      " 'Aqua' (water)0>",
                      " 'Terra' (earth)0>",
                      " and 'Tenebris' (darkness)0._Take a good look at them_and choose one carefully!_(Navigate with Arrow-Controls)$"];
                      //I'll give you one of them later"];
        
        this.progress = 0;
        this.timer = 1;
        this.speed = 3;
        this.lines = 1;
        this.controls = 0;
        this.refreshText();
    }

    refreshText() {
        this.text = ["", "", "", "", ""];
    }

    update (ctx) {
        this.timer++;
        if (this.timer%this.speed == 0 && this.timer/this.speed < this.story[this.progress].length) {
            if (this.story[this.progress][Math.floor(this.timer/this.speed)] == "_") {
                this.lines +=1;
            }
            else if (this.story[this.progress][Math.floor(this.timer/this.speed)] == ">") {
                this.controls =1;
            }
            else if (this.story[this.progress][Math.floor(this.timer/this.speed)] == "0") {
                this.eggC++;
            }
            else if (this.story[this.progress][Math.floor(this.timer/this.speed)] == "$") {
                this.controls = 2;
                this.activeEgg = 0;
            }
            else {
            this.text[this.lines] += this.story[this.progress][Math.floor(this.timer/this.speed)];
            }
        }
    }

    draw(ctx) {
        this.drawBackground(ctx);
        this.drawEggs(ctx);
        this.drawDialogueBox(ctx);
        this.drawDialogue(ctx, this.lines);
    }

    confirm(bool) {
        if (this.controls == 1) {
            this.timer = 0;
            this.progress += 1*bool;
            console.log(this.progress);
            this.controls = 0;
            this.refreshText();
            this.lines = 1;
        }
        else if (this.controls == 2) {
            //this.select();
            console.log(this.creatures[this.activeEgg]);
            return this.creatures[this.activeEgg];
        }
        return false;
    }

    select() {
        // set update flag (to return to PetFight)
        // choose creature
    }

    switchEgg (bool, value) {
        if (this.controls == 2) {
            this.activeEgg += value*bool+6;    // Für %-Navigation: Brilliant oder was?
            this.activeEgg %=6;    //Nach letztem Move von vorn :)
        }
    }

    drawDialogue(ctx, lines) {
        for (let j = 1; j<= lines; j++) {
            this.drawString(ctx, "#000000", 12, 415+16*j, this.text[j]);
        }
    }

    drawBackground(ctx) {
        let image = new Image();
        image.src = "../../src/images/start_shelf.png";
        ctx.drawImage(image,0,0,400,500);
    }

    /*
    drawEgg(ctx, i) {
        let image = new Image();
        image.src = "../../src/images/eggs/"+this.eggs[i]+".png";
        ctx.drawImage(image,40+220*(i%2), 35+160*(i%3), 103, 125);
    }*/

    drawEggs(ctx) {
        for (let i=0; i<this.eggC; i++) {
            let image = new Image();
            let egg = this.eggs[i];
            if (this.activeEgg == i) {
                egg += "_sel";
            }
            image.src = "../../src/images/eggs/"+egg+".png";
            ctx.drawImage(image,40+220*(i%2), 35+160*(i%3), 103, 125);
        }
    }
}