/**
 * létrehoztunk egy Area nevű osztályt amely tartalmaz 1 konstruktor
 * az osztályban lévő konstruktorban történik meg a div-ek létrehozása
 */
class Area{
    
    #div;//egy privát tulajdonsága a area osztálynak

    /**
     * getter függvény amely eléri azt hogy a privát tulajdonság el lehessen érni
     * @returns {HTMLDivElement}a létrehozott div
     */
    get div(){
        return this.#div;//vissza tér a privát divvel
    }
    /**
     * A konstruktor feladata a div elkészítése és osztálya beállítása paraméter szerint a privátmetódus által létrejött containerben
     * @param {string} className //a string paraméter amely a osztály nevet tartalmazza
     */
    constructor(className){//konstruktor és string típusú className paramétere
        const container = this.#getContainer();//meghívjuk a privátmetódust azon értelemben hogy kiválasszuk a containert
        this.#div = document.createElement('div');//létrehozzuk a divet egy div nevű változóban
        this.#div.className = className;//a div className tulajdonságához hozzá adjuk a className paramétert
        container.appendChild(this.#div);//a div változót hozzáadjuk a container-hez
    }
    /**
     * privát függvény amely elősször kiválasztja azon containert amely tartalmazza a .containeroop osztályt
     * de egyben ha nem létezik ilyen container akkor létrehozz egyet
     * @returns {HTMLDivElement} a visszatérő container div element
     */
    #getContainer(){
        let containerDiv = document.querySelector('.containeroop');//kiválasztjuk azokat a HTMLElementeket amely tartalmazzák a .containeroop osztályt és hozzáadjuk a containerDiv változóhoz
        if(!containerDiv){//ha a containerDiv null akkor belép
            containerDiv = document.createElement('div');//létrehozz egy containerDiv változó nevű div elemet
            containerDiv.className = 'containeroop';//a divhez className tulajdonságnak megkapja a containeroop-t
            document.body.appendChild(containerDiv);//a testtőrzshöz hozzáadjuk a container divet
        }return containerDiv;//vissza térítjük a container divet
    }
}

/**
 * ezzel a extension osztályjal érjük el a táblázat fejléc létrehozását
 * a Table ősosztálya az Area osztály
 */
class Table extends Area {
    
    /**
     * meghívjuk az ősosztályban lévő konstruktort és létrehozzuk a táblázatott
     * @param {string} cssOsztaly 
     */
    constructor(cssOsztaly){
        super(cssOsztaly);
        const tbody = this.#createTable();
    }

    /**
     * a privát függvény azt végzi el hogy a táblázatot létrehozzuk és fejlécét feltöltjük
     * @returns {HTMLTableSectionElement}//a visszatérő táblázat tőrzse
     */
    #createTable(){
        const table = document.createElement('table');//a táblázatott létrehozom
        this.div.appendChild(table);//hozzáadom a táblázatott a divhez
        const thead = document.createElement('thead');//a fejlécet létrehozom
        table.appendChild(thead);//a fejlécet hozzáadom a tablehöz
        const theadRow = document.createElement('tr');//létrehozoma fejléc sorát
        thead.appendChild(theadRow);//hozzáadom a sort a fejléchez
        const theadCells = ['név', 'születési dátum', 'irányítószám'];//egy tömb amely tartalmazza a fejléc string típusu értékeit
        for(const cellContent of theadCells){//végig iterálunk a tömbön
            const thcell = document.createElement('th');//létrehozunk egy fejlcéc ellát
            thcell.innerText = cellContent;//a fejléc cella tartalmát feltöltjük az elemel
            theadRow.appendChild(thcell);//a cellát hozzáadjuk a fejléc sorhoz
        }
        const tbody = document.createElement('tbody');//létrehozzuk a táblázat tőrzsét
        table.appendChild(tbody);//a tbodyt hozzáadjuk a táblázathoz
        return tbody;//visszatérünk a tbodyval
    }
}

/**
 * ezzel a extension osztályjal érjük el a form létrehozását
 * a Form ősosztálya az Area osztály
 */
class Form extends Area {
    /**
     * a form létrehozásáért felelős konstruktor
     * @param {string} cssClass a paraméter amely az osztály nevet tartalmazza és aszerint hozza létre a divet
     * @param {Array} fieldElementList a lista amely tartalmazza a field ID-ját és tartalmát
     */
    constructor(cssClass, fieldElementList){
        super(cssClass);//meghívja a Area-ban lévő konstruktort a cssClass paraméterrel  
        const form = document.createElement('form');//létrehozzuk a form elementet
        this.div.appendChild(form);//hozzáadjuk a formot a divhez
        
        for(const fieldElement of fieldElementList){//végig iterálunk a lista elemein
            const field = makeDiv('field');//létrehozunk egy field osztályú divet a makeDiv függvénnyel
            form.appendChild(field);//a fieldet hozzáadjuk a fromhoz
            const label = document.createElement('label');//a field labeljét létrehozom
            label.htmlFor = fieldElement.fieldid;//a label htmlFor tulajdonsága megkapja a fieldid elem tulajdonságot
            label.textContent = fieldElement.fieldLabel;//a label tartalmát feltöltjük az elem fieldLabel tulajdonságával
            field.appendChild(label)//hozzáadjuk a labelt a fieldhez
            const input = document.createElement('input');//létrehozzuk a field inputját
            input.id = fieldElement.fieldid;//az input id tulajdonsága megkapja az elem fieldid tulajdonságát
            field.appendChild(document.createElement('br'))//a divhez hozzáadunk a benne létrehozott sortörést
            field.appendChild(input)//az inputot hozzáadjuk a divhez
        }
        
        const button = document.createElement('button');//létrehozzuk a gomb elementet
        button.textContent = 'hozzáadás';//a gomb belső szövegét feltöltjük
        form.appendChild(button)//a gombot hozzáadjuk a fromhoz
    }
}