import { GameObject } from "../../vendor/gamebox/src/js/GameObject.js";


export class BattleCreature extends GameObject {

    constructor(x, y, width, height, color, type, name, sprite="none", creatureStats, creatureMoves, getXp, creatureTypes, creatureAbilities) {
        super(x, y, width, height, color)
        this.type = type;
        this.name = name;
        this.sprite = sprite;
        this.stats = creatureStats; //this.player = {name: "Bla", health: 35, maxhealth: 35, energy:30, maxenergy:30, atk: 5, def: 3, spatk: 5, spdef: 4};
        this.moves = creatureMoves;
        this.getXp = getXp;
        this.types = creatureTypes;
        this.abilities = creatureAbilities;
    }

    draw(ctx) {
        if (this.sprite == "none") {
            switch (this.type) {
                case "player":
                    ctx.fillStyle = "#10C47D"
                    ctx.beginPath();
                    ctx.moveTo(10, 480);
                    ctx.lineTo(110,420);
                    ctx.lineTo(120,405);
                    ctx.lineTo(20, 300);
                    ctx.closePath(200, 99);
                    ctx.fill();
                break;
                case "enemy":
                    ctx.fillStyle = "#D62F15"
                    ctx.beginPath();
                    ctx.moveTo(290, 80);
                    ctx.lineTo(330,3);
                    ctx.lineTo(420,3);
                    ctx.lineTo(450, 58);
                    ctx.lineTo(310, 100);
                    ctx.closePath(390, 99);
                    ctx.fill();
                break;
            }
        }
        else {
            // switch (this.type) {    //Alter Switch vom Versuch Kreaturen zu Spiegeln, der bleibt erstmal für bessere Zeiten
            //     case "player":
                    
            //     break;
            //     case "enemy":

            //     break;
            // }
            let image = new Image();
            image.src = "../../src/images/creatures/"+this.sprite+"_"+this.type+".png";

            ctx.drawImage(image, this.x, this.y, this.width, this.height);

        }
    }

}