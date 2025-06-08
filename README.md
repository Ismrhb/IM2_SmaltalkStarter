Kurzbeschreibung

In meinem Projekt habe ich mit einem Random Fact Generator versucht ein Programm zu bauen, welches Menschen beim Smaltalk anstossen hilft. 
Auf der Startseite habe ich einen Button gemacht, welcher durch Klicken einen Fakt aus der API anzeigt. 
Durch Klicken auf den «Next-Button» wird ein neuer Fakt geladen. Gute Themen können durch einen Klick auf das Herz in der Favoritenleiste gespeichert werden. 
Das Programm lebt vom Moment, weshalb es keinen «Zurück» Knopf gibt. Das Programm funktioniert auf Deutsch oder Englisch. 
Favoriten können in Deutsch und Englisch am selben Ort abgespeichert werden. 

Das Projekt hat mir grosse Schwierigkeiten bereitet, da ich es allein gemacht habe und es mir sehr schwerfiel, 
die verschiedenen Zusammenhänge gerade im Javascript festzustellen und auf «Papier» zu bringen. 
Ich habe sicherlich gelernt eine Struktur zu finden, auch wenn hier noch viel Luft nach oben ist. 
Auch meine Prompts für Chat GPT wurde im Verlaufe der Arbeit besser. Insgesamt hat mich das Projekt sehr fest gefordert. 

Ich habe beim Arbeiten an dem Projekt viel mit Chat GPT gearbeitet. 
Ausserdem habe ich mich an Übungen aus dem Unterricht orientiert. 
Beispielsweise für meinen Sprachwechsel Deutsch und Englisch konnte ich viel von einer Übung aus dem Unterricht (Übung 12a) abschauen und übernehmen. 
Auch des Coachings bzw. die Hilfelektionen von Lea und Beni haben mir sehr geholfen und Klarheit geschaffen. 
Sie konnten mir eine Struktur in meine Arbeit geben. So habe ich auf meiner Seite «Favoriten» bsp. ein von Lea vorgeschlagenes Masonry-Grid umsetzen können. 
Ich habe gelernt die Prompts so genau wie möglich zu schrieben für Chat GPT. 
Am Anfang eines Chats habe ich Chat GPT jeweils folgende Anweisung gegeben: 

"Stell dir vor du bist erfahrener IT-Spezialist und hilfst mir bei meiner Abschlussarbeit gib mir in Zukunft nur noch antworten, 
die auf Best-Practice Beispielen basieren und die auf JavaScript es6 basieren." 
So habe ich steht Antworten mit dem neusten und aktuellen Code erhalten. 


Weitere wegweisende Prompts:

Animation des Startbuttons

Du siehst hier meinen vollständigen Code für meine Webseite. Ich möchte gerne eine Animation erstellen, 
bei der durch Drücken des Knopfes („Hier klicken“) die unten aufgeführte große Box (Textbox) aufgefahren wird.
Der Code soll Folgendes beinhalten: Ich will, dass beide Elemente mit ihren bereits vorhandenen Attributen bestehen bleiben, wie sie es bereits sind. 
(Die Textbox soll jedoch oben links an derselben Stelle verankert sein wie der Button, da es so aussehen soll, als würde sich der Button vergrößern.)
Das bedeutet: Die Elemente button-start und textboxelement sollen als separate Elemente erscheinen. Sobald das Element button-start gedrückt wird, verschwindet der Text, 
das Element wird langsam breiter und erhöht anschließend seine Höhe – bis auf dieselbe Höhe wie das Element textboxelement, welches zu diesem Zeitpunkt noch nicht sichtbar ist.
Sobald button-start die gewünschte Größe erreicht hat, wird der graue Hintergrund von textboxelement langsam sichtbar, während das Element button-start an Sichtbarkeit verliert.
Nun ist das Element textboxelement sichtbar. Auch die weiteren Elemente – „Wusstest du“, der Fakt, das Herz und der „Next“-Button – sollen in dieser Reihenfolge eingefügt werden, 
jeweils mit einer kurzen Verzögerung.

Anschliessend habe ich Chat GPT meinen ganzen Code zugeschickt. 

Übersetzung der Webseite

Hierfür habe ich Chat GPT meine Intention einer übersetzten Webseite geschildert und ihm ein Beispiel dazu geschickt, 
anschliessend habe ich ihn mir alle für ihn relevanten Fragen stellen lassen:

Danke für die Infos! Basierend auf deinen Angaben ist alles gut vorbereitet für die Umsetzung deiner zweisprachigen Webseite. Wenn du möchtest, kann ich dir direkt:
1.	eine passende translations.json-Datei auf Deutsch und Englisch schreiben,
2.	deinen JavaScript-Code anpassen, damit er sie aus dem assets/-Ordner lädt,
3.	den Sprachumschalter in der Navigation funktional machen,
4.	und optional die gewählte Sprache per localStorage speichern.

Nachdem ich auf diese Fragen geantwortet habe, hat mir Chat GPT den Code geschrieben. Mit ein paar Feinjustierungen hat der Code auch funktioniert. 






