//import {Player, Tree, Mountain, Water} from "../../src/js/Mapobjects.js";

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
        //console.log("aktuelle Map nach start():" + this.currentMapx + "/" + this.currentMapy);
       
        this.colors = {nextMap:"#20860D", mountain:"#180b1d", tree:"#02402f", fight:"#601815", water:"#0E69FB", healer:"#FFFFFF"};
        if (!this.currentMapx){
            this.currentMapx = 0;
        }
        if (!this.currentMapy){
            this.currentMapy = 0;
        }
        //Array für die Maps erstellen
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
            ["TTTTTTTTTTTMMMMMMMMMMMMM",
            "TTT______________MMMMMMM",
            "T__________________MMMMM",
            "T_______E____________TMT",
            "TT_________________TTTTT",
            "TTT_________________TTTT",
            "TTTTTTT______T________TT",
            "TTTTTT____________TTTTTT",
            "TTT_____________TTTTTTT_",
            "TT_________________T_TT_",
            "TTT____________________S",
            "TT______________D_TTTTTT",
            "T___________________TTTT",
            "TTTTUU________________TT",
            "UUUUUUUUUT__________TTTT",
            "T____UUUU____________TTT",
            "T____________________TTT",
            "T______________________T",
            "TTH_________________T_UU",
            "TTTTTTTTTTTTTTTTTTTTTOTU",
            ]
        )
        this.allMaps[1][0]= (
            ["TTTTTTTTTTTTTTTTTTTTTWTU",
            "T______________________U",
            "T___________________UUUU",
            "T_______E__________UU__S",
            "T______________MMUUU___T",
            "T_____________MMMMU____T",
            "T______________MMMMM___T",
            "T______________________T",
            "T_________TTT__________T",
            "TTTTTT_____TT__________T",
            "T__TTTTTTTTTTTTTTTTTTTTT",
            "TT____TTT______T____T__T",
            "T______T_________TTTTT_T",
            "T______________________T",
            "T______________________T",
            "T______________________T",
            "T__________________D___S",
            "MM_____________________T",
            "MMMM___________________T",
            "MMMMMTTTTTTTTTTTTTTTTTTT",
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
            "UUUUUU_______________TTT",
            "UUUUUUUUUU___________TTT",
            "UUUUUUUU_______________T",
            "UUUU________________T_TT",
            "UUUUTTTTTTTTTTTTTTTTTOTT",
            ]
        )
        this.allMaps[1][1]= (
            ["TTTTTTTTTTTTTTTTTTTTTWTT",
            "T______________________T",
            "T______________________T",
            "N_______E______________T",
            "T______________________T",
            "T_____________MM_______T",
            "T______________MM______T",
            "T_______________MMMMMM_T",
            "T__________________MM__T",
            "TTTTTT_____TTTTTTMMMM__T",
            "TU_____UUUUUUTTTTTTTTTTT",
            "TTTT______UUUUUUUTTTTT_T",
            "MMMMMM_________________T",
            "MMMM___________________T",
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
        //console.log("aktuelle Map vor entitie Test:" + this.currentMapx)
       
        for (let i=0; i<=this.maplengthx; i++){
            this.entities[i] = [];
            for (let j=0; j<=this.maplengthy; j++){
                //console.log(this.allMaps[0][i]);
                // console.log(this.allMaps[0][i].charAt(j));
                // console.log(this.currentMapx);
                this.entities[i][j] = {content: undefined};

                switch(this.allMaps[this.currentMapx][this.currentMapy][i].charAt(j)){
                    case "T": this.entities[i][j].content = new Tree (this.colors["tree"], "tree", "");
                    break;
                    case "U": this.entities[i][j].content = new Water (this.colors["water"], "water", "");
                    break;
                    case "M": this.entities[i][j].content = new Mountain (this.colors["mountain"], "mountain", "");
                    break;
                    case "E": this.entities[i][j].content = ( new MapObject(this.colors["fight"], "fight", "Bad Rabbit"));
                    break;
                    case "D": this.entities[i][j].content = ( new MapObject(this.colors["fight"], "fight", "Flameling"));
                    break;
                    case "O": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "east", "Osten"));
                    break;
                    case "W": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "west", "Westen"));
                    break;
                    case "S": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "south", "Süden"));
                    break;
                    case "N": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "north", "Norden"));
                    break;
                    case "H": this.entities[i][j].content = ( new MapObject(this.colors["healer"], "healer", "Heiler"));
                    break;
                    
                }
            }
        }
        //this.entities[9][9].content = ( new MapObject("#000000", "fight", "Böser Hase"));
        //console.log("Player x: " + this.playerPosx + " Player y:" + this.playerPosy)
        if(!this.playerPosx && !this.playerPosx){
            this.playerPosx = 12;
            this.playerPosy = 10;
        
        }
        //console.log("Player x nach if: " + this.playerPosx + " Player y:" + this.playerPosy)


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
                    this.entities[newPlayeri][newPlayerj].content = null;
                    //this.allMaps[this.currentMapx][this.currentMapy][newPlayeri][newPlayerj]="_";
                    return mapUpdate;
                }
                case "east": {
                    //console.log("jetzt nach Osten")
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = 1;
                    mapUpdate[2] = newPlayerj;
                    mapUpdate[3] = this.currentMapx+1;
                    mapUpdate[4] = this.currentMapy;
                    return mapUpdate;
                }
                case "west": {
                    //console.log("jetzt nach Westen")
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
                case "healer": {
                    mapUpdate[0] = "healer";
                    return mapUpdate;
                }
            }
        }
        return false;
    }
    openMapMenu(){
        let mapUpdate = [];
        mapUpdate[0] = "MapMenu";
        mapUpdate[1] = this.player.i;
        mapUpdate[2] = this.player.j;
        mapUpdate[3] = this.currentMapx;
        mapUpdate[4] = this.currentMapy;
        //console.log("MapUpdates in Map OpenMenu: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3] + " [5], " + mapUpdate[4]);
        return mapUpdate; 

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
                }
            }
        }
    }

    update() {
        let mapUpdate = [];
        for (let i in this.entities){
            for (let j in this.entities[i]) {
                //hier dann mal Update für Gegnerbewegung

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
        
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fillRect(i*size, j*size, size, size);
    }  

}

export class Mountain extends MapObject{
    draw(ctx, i, j, size){
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        let x = i * size,
            y = j * size;
        ctx.fillStyle = "#111111";
        ctx.fillRect(x, y, size, size);

        ctx.fillStyle = "#D5E9F6";
        ctx.beginPath();
        ctx.moveTo(x, y+20);
        ctx.lineTo(x, y+20);
        ctx.lineTo(x+10, y+3);
        ctx.lineTo(x+20, y+20);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#575D63";
        ctx.beginPath();
        ctx.moveTo(x, y+20);
        ctx.lineTo(x, y+20);
        ctx.lineTo(x+7, y+7);
        ctx.lineTo(x+16, y+20);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#575D63";
        ctx.beginPath();
        ctx.moveTo(x, y+20);
        ctx.lineTo(x+4, y+20);
        ctx.lineTo(x+13, y+6);
        ctx.lineTo(x+20, y+20);
        ctx.closePath();
        ctx.fill();
    }
}
export class Water extends MapObject{
    draw(ctx, i, j, size){
        ctx.shadowBlur = -0;
        ctx.shadowColor = "transparent";        
        let x = i * size,
            y = j * size;
        ctx.fillStyle = "#4694EF";
        ctx.fillRect(x, y, size, size);

        ctx.beginPath();
        ctx.arc(x+5, y+11, 5,1.2*Math.PI,1.8*Math.PI);
        ctx.arc(x+15, y+7, 5,0.8*Math.PI,2.2*Math.PI, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x+5, y+16, 5,1.2*Math.PI,1.8*Math.PI);
        ctx.arc(x+15, y+12, 5,0.8*Math.PI,2.2*Math.PI, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x+5, y+6, 5,1.2*Math.PI,1.8*Math.PI);
        ctx.arc(x+15, y+2, 5,0.8*Math.PI,2.2*Math.PI, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x+5, y+21, 5,1.2*Math.PI,1.8*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x+15, y-3, 5,0.8*Math.PI,2.2*Math.PI, true);
        ctx.stroke();
        ctx.strokeStyle = "#1665E4";
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


