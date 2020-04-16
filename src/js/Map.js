

export class Map {
    constructor(maplengthx, maplengthy, name){
        this.maplengthx = maplengthx;
        this.maplengthy = maplengthy;
        this.name = name;
    }

    start() {
        this.battleencounter = false; //bei true -> in Battle wechseln
        this.size = 20; 
        this.maplengthx = 19;//*this.fieldlength;
        this.maplengthy = 24;//*this.fieldlength;
       
        this.colors = {mountain:"#180b1d", tree:"#02402f", fight:"#ba9714", water:"#db0303", swamp:""};

        

        // Entity Test ab hier:
        this.entities = [];
        
        for (let i=0; i<=this.maplengthx; i++){
            this.entities[i] = [];
            for (let j=0; j<=this.maplengthy; j++){
                this.entities[i][j] = {content: undefined};
                if (i === 0 || j === 0 || i === this.maplengthx || j === this.maplengthy){
                    this.entities[i][j].content = new Tree (this.colors["tree"], "tree", "");
                }
            }
        }
        this.entities[9][9].content = ( new MapObject("#000000", "fight", "Böser Hase"));
        this.player = new Player(10, 12, this.size, this.size, "#180b1d", 10);
        this.entities[10][12].content = this.player;
    }

    playerMove(di, dj) {
        let newPlayeri = this.player.i + di,
            newPlayerj = this.player.j + dj,
            targetField = this.entities[newPlayeri][newPlayerj].content;

        if(!targetField){
            this.entities[this.player.i][this.player.j].content = undefined;
            this.entities[newPlayeri][newPlayerj].content = this.player;
            this.player.move(di, dj);
        } else if(targetField.type === "fight"){
            let mapUpdate = [];
            mapUpdate[0] = "startBattle";
            mapUpdate[1] = this.entities[newPlayerj][newPlayerj].name;
            return mapUpdate;
        }
        
        return false;
    }
    // drawTree(ctx, x, y) {        
    //     ctx.fillStyle = "#10C47D";
    //     ctx.beginPath();
    //     ctx.moveTo(i+10, y);
    //     ctx.lineTo(i+14, j+8);
    //     ctx.lineTo(i+12, j+8);
    //     ctx.lineTo(i+16, j+14);
    //     ctx.lineTo(i+14, j+14);
    //     ctx.lineTo(i+18, j+16);
    //     ctx.lineTo(i+11, j+16);
    //     ctx.lineTo(i+11, j+19);
    //     ctx.lineTo(i+9, j+19);
    //     ctx.lineTo(i+9, j+16);
    //     ctx.lineTo(i+2, j+16);
    //     ctx.lineTo(i+6, j+14);
    //     ctx.lineTo(i+4, j+14);
    //     ctx.lineTo(i+8, j+8);
    //     ctx.lineTo(i+6, j+8);
    //     ctx.lineTo(i+10, y);
    //     ctx.closePath(200, 99);
    //     ctx.fill();
    // }

    draw(ctx){
        this.player.draw(ctx);
        this.drawEntities(ctx);
    }

    drawEntities(ctx) {
        for (let i in this.entities) {
            for (let j in this.entities[i]){ 
                if (this.entities[i][j].content) {         
                    this.entities[i][j].content.draw(ctx, i, j, this.size);
                    // if (this.entities[i][j].content.type === "tree"){
                    // //console.log("x:" + this.entities[i].x)
                    // //console.log("y:" + this.entities[i].y)
                    //     this.drawTree(ctx, this.entities[i][j].content.x, this.entities[i][j].content.y);
                    //}
                }
            }
        }
    }

    update() {
        let mapUpdate = [];
        for (let i in this.entities){
            for (let j in this.entities[i]) {
                //hier dann mal Update für Gegnerbewegung


                // if (MapObject.rectangleCollision(this.entities[i][j], this.player)) {
                //     if (this.entities[i][j].type === "fight"){
                //         //console.log("fight");
                //         mapUpdate[0] = "startBattle";
                //         mapUpdate[1] = this.entities[i][j].name;
                //         return mapUpdate;
                        
                //     }
                //     if (this.entities[i][j].type === "tree"){
                //         mapUpdate[0] = "map";
                //         // irgendwie schaffen, dass man nicht auf diese Feld laufen kann 
                //     }
                // }
                // else {
                //     mapUpdate[0] = "map";
                //     return mapUpdate;
                // }
            }
        }
        
    }

}

export class MapObject{
    constructor(color, type, name){
        this.color = color;
        this.type = type;
        this.name = name;
    }
    draw(ctx, i, j, size){
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillRect(i*size, j*size, size, size);
    }  

}
export class Tree extends MapObject{
    draw(ctx, i, j, size){
        let x = i * size,
            y = j * size;
        ctx.fillStyle = "#10C47D";
        ctx.beginPath();
        ctx.moveTo(x+10, y);
        ctx.lineTo(x+14, y+8);
        ctx.lineTo(x+12, y+8);
        ctx.lineTo(x+16, y+14);
        ctx.lineTo(x+14, y+14);
        ctx.lineTo(x+18, y+16);
        ctx.lineTo(x+11, y+16);
        ctx.lineTo(x+11, y+19);
        ctx.lineTo(x+9, y+19);
        ctx.lineTo(x+9, y+16);
        ctx.lineTo(x+2, y+16);
        ctx.lineTo(x+6, y+14);
        ctx.lineTo(x+4, y+14);
        ctx.lineTo(x+8, y+8);
        ctx.lineTo(x+6, y+8);
        ctx.lineTo(x+10, y);
        ctx.closePath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    }
}

export class Player extends MapObject{
    constructor(i, j){
        super("#fdff3e", "Player", "Player");
        this.i = i;
        this.j = j;
    }   
    move(di, dj){
        this.i += di;
        this.j += dj;
    }

}

// export class MapObject extends GameObject{
//     constructor(x, y, width, height, color, type, name){
//         super(x, y, width, height, color);
//         this.type = type;
//         this.name = name;
//     }
// }
