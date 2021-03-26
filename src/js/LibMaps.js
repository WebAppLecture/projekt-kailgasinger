// Alle Karten hier ausgelager. Beliebig erweiterbar.

export class LibMap {

    static GetMap (x, y) {
        let map = [];

        if (x === 0) {
            if (y === 0) {
                map =
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
            }
            else {
                map =
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
            }
        }
        else if (x === 1) {
            if (y === 0) {
                map =
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
            }
            else {
                map =
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
            }
        }

        return map;
    }
}