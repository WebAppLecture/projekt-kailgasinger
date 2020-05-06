// export class MapObject{
//     constructor(color, type, name){
//         this.color = color;
//         this.type = type;
//         this.name = name;
//     }
//     draw(ctx, i, j, size){
        
//         ctx.shadowBlur = 4;
//         ctx.shadowColor = this.color;
//         ctx.fillStyle = this.color;
//         ctx.fillRect(i*size, j*size, size, size);
//     }  

// }

// export class Mountain extends MapObject{
//     draw(ctx, i, j, size){
//         ctx.shadowBlur = 0;
//         ctx.shadowColor = "transparent";
//         let x = i * size,
//             y = j * size;
//         ctx.fillStyle = "#111111";
//         ctx.fillRect(x, y, size, size);

//         ctx.fillStyle = "#D5E9F6";
//         ctx.beginPath();
//         ctx.moveTo(x, y+20);
//         ctx.lineTo(x, y+20);
//         ctx.lineTo(x+10, y+3);
//         ctx.lineTo(x+20, y+20);
//         ctx.closePath();
//         ctx.fill();

//         ctx.fillStyle = "#575D63";
//         ctx.beginPath();
//         ctx.moveTo(x, y+20);
//         ctx.lineTo(x, y+20);
//         ctx.lineTo(x+7, y+7);
//         ctx.lineTo(x+16, y+20);
//         ctx.closePath();
//         ctx.fill();

//         ctx.fillStyle = "#575D63";
//         ctx.beginPath();
//         ctx.moveTo(x, y+20);
//         ctx.lineTo(x+4, y+20);
//         ctx.lineTo(x+13, y+6);
//         ctx.lineTo(x+20, y+20);
//         ctx.closePath();
//         ctx.fill();
//     }
// }
// export class Water extends MapObject{
//     draw(ctx, i, j, size){
//         ctx.shadowBlur = -0;
//         ctx.shadowColor = "transparent";        
//         let x = i * size,
//             y = j * size;
//         ctx.fillStyle = "#4694EF";
//         ctx.fillRect(x, y, size, size);

//         ctx.beginPath();
//         ctx.arc(x+5, y+11, 5,1.2*Math.PI,1.8*Math.PI);
//         ctx.arc(x+15, y+7, 5,0.8*Math.PI,2.2*Math.PI, true);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.arc(x+5, y+16, 5,1.2*Math.PI,1.8*Math.PI);
//         ctx.arc(x+15, y+12, 5,0.8*Math.PI,2.2*Math.PI, true);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.arc(x+5, y+6, 5,1.2*Math.PI,1.8*Math.PI);
//         ctx.arc(x+15, y+2, 5,0.8*Math.PI,2.2*Math.PI, true);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.arc(x+5, y+21, 5,1.2*Math.PI,1.8*Math.PI);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.arc(x+15, y-3, 5,0.8*Math.PI,2.2*Math.PI, true);
//         ctx.stroke();
//         ctx.strokeStyle = "#1665E4";
//     }

// }
// export class Tree extends MapObject{
//     draw(ctx, i, j, size){
//         let x = i * size,
//             y = j * size;
//         ctx.fillStyle = "#10C47D";
//         ctx.beginPath();
//         ctx.moveTo(x+10, y);
//         ctx.lineTo(x+14, y+8);
//         ctx.lineTo(x+12, y+8);
//         ctx.lineTo(x+16, y+14);
//         ctx.lineTo(x+14, y+14);
//         ctx.lineTo(x+18, y+16);
//         ctx.lineTo(x+11, y+16);
//         ctx.lineTo(x+11, y+19);
//         ctx.lineTo(x+9, y+19);
//         ctx.lineTo(x+9, y+16);
//         ctx.lineTo(x+2, y+16);
//         ctx.lineTo(x+6, y+14);
//         ctx.lineTo(x+4, y+14);
//         ctx.lineTo(x+8, y+8);
//         ctx.lineTo(x+6, y+8);
//         ctx.lineTo(x+10, y);
//         ctx.closePath();
//         ctx.shadowBlur = 10;
//         ctx.shadowColor = this.color;
//         ctx.fill();
//     }
// }
// export class Player extends MapObject{
//     constructor(i, j){
//         super("#fdff3e", "Player", "Player");
//         this.i = i;
//         this.j = j;
//     }   
//     move(di, dj){
//         this.i += di;
//         this.j += dj;
//     }

// }
