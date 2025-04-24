//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
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
      * A konstruktor feladata a div elkészítése és osztálya beállítása paraméter szerint a privátmetódus által létrejött containerben
      * @param {string} className //a string paraméter amely a osztály nevet tartalmazza
      */
    constructor(className){//konstruktor és string típusú className paramétere
        const container = this.#getContainerDiv();
        this.#div = document.createElement('div');//létrehozzuk a divet és hozzá rendeljük a privát változóhoz
        this.#div.className = className;//a div privát változó className tulajdonságához hozzá rendeljük a className paramétert
        container.appendChild(this.#div);//a div privát változót hozzáadjuk a containerDiv-hez
    }
    /**
      * privát függvény amely elősször kiválasztja azon containert amely tartalmazza a .containeroop osztályt
      * de egyben ha nem létezik ilyen container akkor létrehozz egyet
      * @returns {HTMLDivElement} a visszatérő container div element
      */
    #getContainerDiv(){//privát metódus
        let containerDiv = document.querySelector('.containeroop');//kiválasztjuk azokat a HTMLElementeket amely tartalmazzák a .containeroop osztályt és hozzáadjuk a containerDiv változóhoz
        if(!containerDiv){//ha a containerDiv null akkor belép
            containerDiv = document.createElement('div');//létrehozz egy containerDiv változó nevű div elemet
            containerDiv.className = 'containeroop';//a divhez className tulajdonságnak megkapja a containeroop-t
            document.body.appendChild(containerDiv);//a testtőrzshöz hozzáadjuk a container divet
        }return containerDiv;//vissza térítjük a container divet
    }

    /**
     * A cella létrehozását és tartalma feltöltését végzi el egyben hozzáadja a megadott parent elementhez
     * @param {String} cell //a cella típus pl.: th vagy td
     * @param {String} cellContent //a cella tartalma amivel feltöltjük a cellát
     * @param {HTMLTableRowElement} rowElement //a row element amelyhez hozzáadjuk a cellát
     */
    createCell(cell, cellContent, rowElement){
        const cella = document.createElement(cell);//létrehozzuk a cellát a megadott paraméter alapján
        cella.innerText = cellContent;//a cella tartalmát feltöltjük a cellContent paraméter alapján
        rowElement.appendChild(cella);//a parentElementhez hozzáadjuk a cellát
    }
}

//---------------------------------------------------------------------------------------------------
/**
 * A table az Area osztály leszármazott osztálya
 * Az osztályban a table divje és táblázat létrehozása történik meg
 */
class Table extends Area {
    constructor(cssClass){//a table konstruktora ahol létrehozzuk a táblázatott
        super(cssClass);//meghívjuk az Area konstruktorát és létrehozunk egy divet vele
        const tbody = this.#createTable();//meghívjuk a privát függvényt és hozzáadjuk a tbody változóhoz
    }
    /**
     * egy privát metódus amely a táblázat létrehozásáért felelős
     */
    #createTable(){
        const table = document.createElement('table');//létrehozunk egy table elementet
        this.div.appendChild(table);//a table elementet hozzáadjuk a létrehozott divhez
        const thead = document.createElement('thead');//létrehozzuk a fejlécet
        table.appendChild(thead);//a fejlécet hozzáadjuk a táblázathoz
        const theadRow = document.createElement('tr');//létrehozzuk a fejléc sorát
        thead.appendChild(theadRow);//a fejléc megkapja a fejléc soárt
        const theadCellArray = ['szerző', 'műfaj', 'cím'];//létrehozunk egy tömböt amely tartalmazza a fejléc celláinak szövegeit
        for(const cellContent of theadCellArray){//végig iterálunk a tömb egyes elemein
            this.createCell('th', cellContent, theadRow);//meghívjuk az ősosztályban lévő metódus amely által létreohzzuk a fejléc celláit
        }
        const tbody = document.createElement('tbody');//létrehozunk a táblázat tőrzsét
        table.appendChild(tbody);//a táblázathoz hozzáadjuk a tőrzsét
        return tbody;//visszatérünk a táblázat tőrzsével
    }
}

//---------------------------------------------------------------------------------------------------
/**
 * A Form osztály az Area osztály leszármazottja
 * az osztály felelős hogy létrehozza a formot, és annak fieldjeit,
 * gombjait.
 */
class Form extends Area {

    /**
     * //A form konstruktora ahol létrehozzuk a formot és annak fieldjeit
     * @param {string} cssClass az osztály amely a div osztálya lesz
     * @param {Array} fieldElementList a tömb amely tartalmazza a field tulajdonságait
     */
    constructor(cssClass, fieldElementList){
        super(cssClass);//meghívjuk az Area konstruktorát hogy létrehozzuk a Form div elementét
        const form = document.createElement('form');//létrehozzunk egy formot
        this.div.appendChild(form);//az újonnan létrehozott divhez hozzáadjuk a formot
        for(const fieldElement of fieldElementList){//végig iterálunk a tömb egyes objektumain
            const field = makeDiv('field');//létrehozzunk egy field divet
            form.appendChild(field);//hozzáadjuk a field osztályú divet a formhoz
            const label = document.createElement('label');//létrehozzunk egy label elementet
            label.htmlFor = fieldElement.fieldid;//a label htmlFor tulajdonsága megkapja az objektum fieldid tulajdonságát
            label.textContent = fieldElement.fieldLabel;//a label textContent tulajdonsága megkapja az objektum fieldLabel tulajdonságát
            field.appendChild(label)//a labelt hozzáadjuk a fieldhez
            const input = document.createElement('input');//létrehozzuk az input elementet
            input.id = fieldElement.fieldid;//az input element id tulajdonsága megkapja az objektum fieldid tulajdonságát
            field.appendChild(document.createElement('br'))//hozzáadunk a fieldhez egy létrehozott sortörést
            field.appendChild(input)//a fieldhez hozzáadjuk az inputot
        }
        
        const button = document.createElement('button');//létrehozunk egy gomb elementet
        button.textContent = 'hozzáadás';//a tartalmát feltöltjük a hozzáadás string értékkel
        form.appendChild(button)//a gombot hozzáadjuk a formhoz
    }
}