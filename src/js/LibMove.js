
export class LibMove {

    static GetMove (name, caster) {
        let move = [];
        switch (name) {
            case "FieryBreath":
                move.power = 1;
                move.acc = 100;
                move.cost = 5;
                move.xOffPlayer = 40;
                move.xOffEnemy = -30;
                move.yOffPlayer = 30;
                move.yOffEnemy = 10;
                move.type = "special";
            break;
            case "Fireball":
                move.power = 1;
                move.acc = 80;
                move.cost = 15;
                move.xOffPlayer = 40;
                move.xOffEnemy = -30;
                move.yOffPlayer = 30;
                move.yOffEnemy = 10;
                move.type = "special";
            break;
            case "Freeze":
                move.power = 1;
                move.acc = 100;
                move.cost = 10;
                move.xOffPlayer = 40;
                move.xOffEnemy = -30;
                move.yOffPlayer = 30;
                move.yOffEnemy = 10;
                move.type = "special";
            break;
        }
        return move;
    }

}