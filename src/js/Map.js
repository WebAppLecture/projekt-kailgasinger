

export class Map {
    constructor(playerPosx, playerPosy, currentMapx, currentMapy){
        this.playerPosx = playerPosx;
        this.playerPosy = playerPosy;
        this.currentMapx = currentMapx; // Position der aktuellen Map im Map Array allMaps
        this.currentMapy = currentMapy;
    }

    start() {
        this.size = 20; 
        this.maplengthx = 19;
        this.maplengthy = 24;
        console.log("aktuelle Map nach start():" + this.currentMapx)
       
        this.colors = {nextMap:"#20860D", mountain:"#180b1d", tree:"#02402f", fight:"#601815", water:"#db0303", ice:""};
        if (!this.currentMapx){
            this.currentMapx = 0;
        }
        if (!this.currentMapy){
            this.currentMapy = 0;
        }
        
        let iMax = 5;
        let jMax = 3;
        this.allMaps = [];

        let count = 1;
        for (let i=0; i<iMax; i++) {
        this.allMaps[i] = [];
        for (let j=0; j<jMax; j++) {
            this.allMaps[i][j] = count;
            count++;
        }
        }

        // hier Maps erstellen. 

        this.allMaps[0][0]= (
            ["TTTTTTTTTTTTTTTTTTTTTTTT",
            "TTT____________________T",
            "T______________________T",
            "T_______E____________TTT",
            "TT_________________TTTTT",
            "TTT_________________TTTT",
            "TTTTTTT_______________TT",
            "TTTTTT____________TTTTTT",
            "TTT_____________TTTTTTT_",
            "TT_________________T_TT_",
            "TTT____________________S",
            "TT______________D_TTTTTT",
            "T___________________TTTT",
            "TTTT__________________TT",
            "_T__________________TTTT",
            "T____________________TTT",
            "T____________________TTT",
            "T______________________T",
            "TT__________________T_TT",
            "TTTTTTTTTTTTTTTTTTTTTOTT",
            ]
        )
        this.allMaps[1][0]= (
            ["TTTTTTTTTTTTTTTTTTTTTWTT",
            "T______________________T",
            "T______________________T",
            "T_______E______________S",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "TTTTTT_________________T",
            "T________________TTTTTTT",
            "TT_____________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T__________________D___S",
            "T______________________T",
            "T______________________T",
            "TTTTTTTTTTTTTTTTTTTTTTTT",
            ]
        )
        this.allMaps[0][1]= (
            ["TTTTTTTTTTTTTTTTTTTTTTTT",
            "TTT____________________T",
            "T______________________T",
            "T_______E____________TTT",
            "TT_________________TTTTT",
            "TTT_________________TTTT",
            "TTTTTTT_______________TT",
            "TTTTTT____________TTTTTT",
            "TTT_____________TTTTTTT_",
            "TT_________________T_TT_",
            "N__T___________________T",
            "TT______________D_TTTTTT",
            "T___________________TTTT",
            "TTTT__________________TT",
            "_T__________________TTTT",
            "T____________________TTT",
            "T____________________TTT",
            "T______________________T",
            "TT__________________T_TT",
            "TTTTTTTTTTTTTTTTTTTTTOTT",
            ]
        )
        this.allMaps[1][1]= (
            ["TTTTTTTTTTTTTTTTTTTTTWTT",
            "T______________________T",
            "T______________________T",
            "N_______E______________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "TTTTTT_________________T",
            "T________________TTTTTTT",
            "TT_____________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "N__________________D___T",
            "T______________________T",
            "T______________________T",
            "TTTTTTTTTTTTTTTTTTTTTTTT",
            ]
        )

        

        // Entity Test ab hier:
        this.entities = [];
        console.log("aktuelle Map vor entitie Test:" + this.currentMapx)
       
        for (let i=0; i<=this.maplengthx; i++){
            this.entities[i] = [];
            for (let j=0; j<=this.maplengthy; j++){
                //console.log(this.allMaps[0][i]);
                // console.log(this.allMaps[0][i].charAt(j));
                // console.log(this.currentMapx);
                this.entities[i][j] = {content: undefined};

                switch(this.allMaps[this.currentMapx][this.currentMapy][i].charAt(j)){                  

                    // case "_": this.entities[i][j] = {content: undefined};
                    // break;
                    case "T": this.entities[i][j].content = new Tree (this.colors["tree"], "tree", "");
                    break;
                    case "E": this.entities[i][j].content = ( new MapObject(this.colors["fight"], "fight", "Böser Hase"));
                    //console.log(i + "und" + j + "name" + this.entities[i][j].content.type);
                    break;
                    case "D": this.entities[i][j].content = ( new MapObject(this.colors["fight"], "fight", "Dachs"));
                    //console.log(i + "und" + j + "name" + this.entities[i][j].content.type);
                    break;
                    case "O": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "east", "Osten"));                  
                    //console.log(i + "und" + j + "name" + this.entities[i][j].content.type);
                    break;
                    case "W": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "west", "Westen"));                  
                    //console.log(i + "und" + j + "name" + this.entities[i][j].content.type);
                    break;
                    case "S": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "south", "Süden"));                  
                    //console.log(i + "und" + j + "name" + this.entities[i][j].content.type);
                    break;
                    case "N": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "north", "Norden"));                  
                    //console.log(i + "und" + j + "name" + this.entities[i][j].content.type);
                    break;
                    
                }



            //     this.entities[i][j] = {content: undefined};




            //     if (i === 0 || j === 0 || i === this.maplengthx || j === this.maplengthy){
            //         this.entities[i][j].content = new Tree (this.colors["tree"], "tree", "");
            //     }
            }
        }
        //this.entities[9][9].content = ( new MapObject("#000000", "fight", "Böser Hase"));
        console.log("Player x: " + this.playerPosx + " Player y:" + this.playerPosy)
        if(!this.playerPosx && !this.playerPosx){
            this.playerPosx = 12;
            this.playerPosy = 10;
        
        }
        console.log("Player x nach if: " + this.playerPosx + " Player y:" + this.playerPosy)


        this.player = new Player(this.playerPosx, this.playerPosy, this.size, this.size, "#180b1d", 10);
        this.entities[this.playerPosx][this.playerPosy].content = this.player;
    }

    myMaps(){
    }

    playerMove(di, dj) {
        let newPlayeri = this.player.i + di,
            newPlayerj = this.player.j + dj,
            targetField = this.entities[newPlayeri][newPlayerj].content;

        if(!targetField){
            this.entities[this.player.i][this.player.j].content = undefined;
            this.entities[newPlayeri][newPlayerj].content = this.player;
            this.player.move(di, dj);
        } 
        else {
            let mapUpdate = [];
            switch(targetField.type){
                case "fight": {
                    
                    mapUpdate[0] = "startBattle";
                    mapUpdate[1] = this.entities[newPlayeri][newPlayerj].content.name;
                    return mapUpdate;
                }
                case "east": {
                    // this.nextMap = new Map(0, this.playerPosy, this.currentMapx+1);
                    // this.nextMap.start();
                    console.log("jetzt nach Osten")
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = 1;
                    mapUpdate[2] = newPlayerj;
                    mapUpdate[3] = this.currentMapx+1;
                    mapUpdate[4] = this.currentMapy;
                    //console.log("Player x:" + this.playerPosy + " Map:" + this.currentMapx);
                    //console.log("MapUpdates: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3]);
                    return mapUpdate;
                }
                case "west": {
                    console.log("jetzt nach Westen")
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = 18;
                    mapUpdate[2] = newPlayerj;
                    mapUpdate[3] = this.currentMapx-1;
                    mapUpdate[4] = this.currentMapy;
                    return mapUpdate;

                }
                case "north": {
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = newPlayeri;
                    mapUpdate[2] = 22;
                    mapUpdate[3] = this.currentMapx;
                    mapUpdate[4] = this.currentMapy-1;
                    return mapUpdate;

                }
                case "south": {
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = newPlayeri;
                    mapUpdate[2] = 1;
                    mapUpdate[3] = this.currentMapx;
                    mapUpdate[4] = this.currentMapy+1;
                    return mapUpdate;

                }
            }


        }
        
        
        
            // if(targetField.type === "fight"){
            // let mapUpdate = [];
            // mapUpdate[0] = "startBattle";
            // mapUpdate[1] = this.entities[newPlayeri][newPlayerj].content.name;
            // return mapUpdate;
        //}
        //this.entities[i][j].content.start();
        //new Map(0, this.playerPosy, this.currentMapx+1)
        
        return false;
    }

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
