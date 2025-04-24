/**
  * létrehoztunk egy Area nevű osztályt amely tartalmaz 1 konstruktor
  * az osztályban lévő konstruktorban történik meg a div-ek létrehozása
  */
class Area{

    #div;//a privát változó amely a divek tárolásával fog foglalkozni

    get div(){//a div getter függvénye (eltárolja a divvet)
        return this.#div;//visszatér a divvel
    }
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
        this.#div = document.createElement('div');//létrehozzuk a divet és hozzá rendeljük a privát változóhoz
        this.#div.className = className;//a div privát változó className tulajdonságához hozzá rendeljük a className paramétert
        containerDiv.appendChild(this.#div);//a div privát változót hozzáadjuk a containerDiv-hez
    }
}


/**
 * A table az Area osztály leszármazott osztálya
 * Az osztályban a table divje és táblázat létrehozása történik meg
 */
class Table extends Area {
    constructor(cssClass){//a table konstruktora ahol létrehozzuk a táblázatott
        super(cssClass);//meghívjuk az Area konstruktorát és létrehozunk egy divet vele
        const table = document.createElement('table');//létrehozunk egy table elementet
        this.div.appendChild(table);//a table elementet hozzáadjuk a létrehozott divhez
        const thead = document.createElement('thead');//létrehozzuk a fejlécet
        table.appendChild(thead);//a fejlécet hozzáadjuk a táblázathoz
        const theadRow = document.createElement('tr');//létrehozzuk a fejléc sorát
        thead.appendChild(theadRow);//a fejléc megkapja a fejléc soárt
        const theadCellArray = ['szerző', 'műfaj', 'cím'];//létrehozunk egy tömböt amely tartalmazza a fejléc celláinak szövegeit
        for(const cellContent of theadCellArray){//végig iterálunk a tömb egyes elemein
            const thcell = document.createElement('th');//létrehozunk egy fejléc cellát
            thcell.innerText = cellContent;//a fejléc cella tartalma megkapja a tömb elemét
            theadRow.appendChild(thcell);//a fejléc cellát hozzáadjuk a fejlécsorhoz
        }
        const tbody = document.createElement('tbody');//létrehozunk a táblázat tőrzsét
        table.appendChild(tbody);//a táblázathoz hozzáadjuk a tőrzsét
    }
}