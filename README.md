## [Programmierung und Design von WebApplications mit HTML5, CSS3 und JavaScript](https://lsf.uni-regensburg.de/qisserver/rds?state=verpublish&status=init&vmfile=no&publishid=148115&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung) ##

SS2020 

Leitung: Dr. Friedrich Wünsch, Louis Ritzkowski

# Projektname #
Pet Fight, von
Johannes Keil und Adrian Algasinger

### Beschreibung ###
Pet Fight ist ein "retro"-Spiel im Andenken an die alten Pokemonspiele.
In einer virtuellen Gamebox im Browser wurden zentrale Elemente der Pokemonspiele nachgebaut, eine "spielbarkeit" insgesamt ist dabei noch nicht gegeben.
Die SpielerInnen können die verschiedenen Elemente (Map, Story, Kampf, Stats) eines Pokemonspiels testen, bei bedarf können relativ einfach weitere Maps, Kreaturen, Storylines und Moves ergänzt werden. Bisher ist ein "Gewinnen" oder "Verlieren" jedoch noch nicht möglich.
### Umsetzung ###
Die Basisdatei PetFight.js "regelt" den gesamten Spielablauf. Sie unterscheidet in welchen Instanzen (Kampf, Karte, Menüs, ...) sich die SpielerIn gerade befindet und regelt die Interaktion der verschiedenen Instanzen.
Die Karte funktioniert rasterbasiert und zeitlos, während der Kampf aus einem Pseudorundensystem besteht. Story-&Statuselemente erwarten in Abhängigkeit eines Timers Eingaben der SpielerIn (analog im Kampf).
Die Startmenüreiter "Battle" & "Map" dienen dem Direkttest von Map-/Kampfelementen, ein "normales" Spiel bei dem unsere einzelnen Komponenten planmäßig interagieren ist nur bei "Start New Game" möglich. Hier sei angemerkt, dass bei der Entscheidung eines Starteis nur Luft, Wasser, Erde und Donner bereits eine korrespondierende Kreatur besitzen.
Die Dialoggeschwindigkeit kann btw. in Start.js Z.30 verändert werden (größere Zahlen für this.timer => langsamere Dialoge). Genauso kann in diesem Fall manuell ein Teil der Story übersprungen werden (siehe Kommentare). 
Nach Wahl des Starter-Eis und dem Schlüpfen der entsprechenden Kreatur ist es noch möglich in einem Menü die Werte und Moves der Kreatur durzusehen. Ein Schließen mit "B" befördert die SpielerIn auf die Karte. Diese erlaubt das angreifen von anderen Kreaturen, einen Healbaustein zum Heilen der eigenen Kreatur und das wechseln auf andere Karten.
Das Kampfsystem funktioniert analog zu den alten Pokemon-Kampfsystemen. Aktuell werden die Kämpfe noch sehr unsauber beendet, wir haben andere Funktionen bevorzugt bearbeitet.
### Steuerung (Falls Spiel) ###
Die Steuerung sollte selbsterklärend sein, die Maus wird nicht benötigt. In den meisten Fällen (Menü, Kampf, ...) bestätigt die "A" Taste eine Auswahl, wohingegen die "B" Taste etwas schließt/ beendet (Kreatur-Status-Seite z.B.).
### Wichtige Klassen/Dateien ###
Alle .js Dateien ;)
Files die mit {Lib} beginnen enthalten Daten, die während des Spiels geladen und verwendet werden. Ansonsten haben wir uns bemüht Drawer auszulagern und sinnvoll die Files zu trennen.
### Designentscheidungen ###
Da sich das Spiel in einer HTML-Canvas abspielt wurde praktisch alles mit js-draw-Fn. umgesetzt. Das archaische Design passt zu den alten Gameboy-Spielen, lediglich die Sprites der Kreaturen sind deutlich "moderner", was uns aber nicht gestört hat. Insgesamt finden wir das einheitliche Kreaturendesign ganz harmonisch. Da kaum Angriffsanimationen vorhanden sind mustten wir uns hierzu noch keine Designfragen stellen.

Bezüglich des Gamebox-skins möchten wir gerne die beiden Skins "water" und "normal" einreichen. Ein dritter Skin "fire" ist gerade im Entstehen - aber noch alles andere als fertig.
Da mir nicht bewusst war wie ich angenehm logik in .css files verwenden kann haben wir hier mit 2 kleinen PHP Skripten gemogelt (das eine ist praktisch überflüssig). Eines der PHP Skripte erzeugt CSS output und zwar je nach "$style": "water", "normal" oder "fire".
Langfristig wäre es natürlich schön wenn User Wunschskins z.B. in einer DB oder zumindest einem Cookie abspeichern und auch etwas kombinieren können, aktuell ist dies noch nicht realisiert.
Ein Drücken von F5 switched momentan zwischen den Skins "water", "normal" und dem unfertigen Skin "fire".
An den Skins ist definitiv zu kritisieren, dass ich probleme mit den rotierten "Button-beschriftungen" hatte. 
Diese wurden an einigen Stellen nun weggelassen. Ich denke ich hätte mir hier helfen können, wollte aber am Grundgerüst der HTML Seite nichts verändern und habe mit css keine Lösung in der Zeit gefunden.