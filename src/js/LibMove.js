
export class LibMove {

    static GetMove (name, caster) {
        let move = [];
        switch (name) {
            case "Fiery Breath":
                move.power = 1;
                move.acc = 100;
                move.cost = 5;
                move.xOffPlayer = 40;
                move.xOffEnemy = -30;
                move.yOffPlayer = 30;
                move.yOffEnemy = 10;
                move.type = "special";
                move.desc = "The creature breaths a cloud of_"
                            +"fire and sparks, hits easily and_"
                            +"deals a nice amount of damage.";
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
                move.desc = "The creature fires a Fireball at_"
                            +"it's enemy. Expensive Move with_"
                            +"lower chance to hit but tons of_"
                            +"damage.";
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
                move.desc = "Icy breath that might freeze the_"
                            +"enemy.";
            break;
            default:
                move.power = 0;
                move.acc = 0;
                move.cost = 0;
                move.xOffPlayer = 0;
                move.xOffEnemy = 0;
                move.yOffPlayer = 0;
                move.yOffEnemy = 0;
                move.type = "special";
                move.desc = "This move is not implemented yet.";

        }
        return move;
    }

}