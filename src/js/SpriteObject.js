
import { GameObject, MovableGameObject } from "../../vendor/gamebox/src/js/GameObject.js";

export class MovableSpriteObject extends MovableGameObject {

    constructor(x, y, width, height, color, vx, vy, sprite="none") {
        super(x, y, width, height, color, vx, vy)
        this.sprite = sprite;
    }

    draw(ctx) {
        if (this.sprite == "none") {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.shadowBlur = 0;
            ctx.shadowColor = this.color;
        }
        else {
            let image = new Image();
            image.src = "../../src/images/"+this.sprite;
            ctx.drawImage(image, this.x, this.y, this.width, this.height)
        }
    }

}

export class MovableSpriteEgg extends MovableSpriteObject {

    constructor(x, y, width, height, color, vx, vy, sprite="none") {
        super(x, y, width, height, color, vx, vy, sprite)
        this.sprite = sprite;
    }

    draw(ctx) {
        if (this.sprite == "none") {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.shadowBlur = 0;
            ctx.shadowColor = this.color;
        }
        else {
            let image = new Image();
            image.src = "../../src/images/"+this.sprite;
            ctx.drawImage(image, this.x, this.y, this.width, this.height)
        }
    }

}