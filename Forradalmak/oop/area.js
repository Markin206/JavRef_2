/**
 * létrehoztunk egy Area nevű osztályt amely tartalmaz 1 konstruktor
 * az osztályban lévő konstruktorban történik meg a div-ek létrehozása
 */
class Area{
    /**
     * A konstruktor egy className string típusu paramtérerel dolgozik
     * elösször a konstruktorban kiválasztjuk a containeroop osztályt tartalmazó divet amely containerDiv változó lesz
     * azon esetben hogyha containerDiv null akkor a konstruktor létrehozza a divet amely tartalmazza a containeroop osztályt
     * ezek után a konstruktorban létrehozzuk a divet
     * a divhez hozzáadjuk a className tulajdonságát amely a bemeneti paramétere lesz a konstruktornak
     * és aztán a divet hozzáadjuk a containerDiv-hez
     * @param {string} className 
     */
    constructor(className){//konstruktor és string típusú className paramétere
        let containerDiv = document.querySelector('.containeroop');//kiválasztjuk azokat a HTMLElementeket amely tartalmazzák a .containeroop osztályt és hozzáadjuk a containerDiv változóhoz
        if(!containerDiv){//ha a containerDiv null akkor belép
            containerDiv = document.createElement('div');//létrehozz egy containerDiv változó nevű div elemet
            containerDiv.className = 'containeroop';//a divhez className tulajdonságnak megkapja a containeroop-t
            document.body.appendChild(containerDiv);//a testtőrzshöz hozzáadjuk a container divet
        }
        const div = document.createElement('div');//létrehozzuk a divet egy div nevű változóban
        div.className = className;//a div className tulajdonságához hozzá adjuk a className paramétert
        containerDiv.appendChild(div);//a div változót hozzáadjuk a containerDiv-hez
    }
}