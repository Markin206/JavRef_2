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
     * @param {string} className //a string paraméter amely a osztály nevet tartalmazza
     */
    #div;//egy privát tulajdonsága a area osztálynak

    /**
     * getter függvény amely eléri azt hogy a privát tulajdonság el lehessen érni
     */
    get div(){
        return this.#div;//vissza tér a privát divvel
    }

    constructor(className){//konstruktor és string típusú className paramétere
        let containerDiv = document.querySelector('.containeroop');//kiválasztjuk azokat a HTMLElementeket amely tartalmazzák a .containeroop osztályt és hozzáadjuk a containerDiv változóhoz
        if(!containerDiv){//ha a containerDiv null akkor belép
            containerDiv = document.createElement('div');//létrehozz egy containerDiv változó nevű div elemet
            containerDiv.className = 'containeroop';//a divhez className tulajdonságnak megkapja a containeroop-t
            document.body.appendChild(containerDiv);//a testtőrzshöz hozzáadjuk a container divet
        }
        this.#div = document.createElement('div');//létrehozzuk a divet egy div nevű változóban
        this.#div.className = className;//a div className tulajdonságához hozzá adjuk a className paramétert
        containerDiv.appendChild(this.#div);//a div változót hozzáadjuk a containerDiv-hez
    }
}

/**
 * ezzel a extension osztályjal érjük el a táblázat fejléc létrehozását
 * a Table ősosztálya az Area osztály
 */
class Table extends Area {
    /**
     * a konstruktorban létrehozzuk a táblázat fejlécét és hozzáadjuk a bodyhoz
     * @param {string} cssClass a paraméter amely az osztály nevet tartalmazza és aszerint hozza létre a divet
     */
    constructor(cssClass){
        super(cssClass);//meghívjuk az ősosztályban lévő konstruktort a cssClass paraméterrel
        const table = document.createElement('table');//létrehozzuk a table elementet
        this.div.appendChild(table);//a divhez hozzáadjuk a táblázatot
        const thead = document.createElement('thead');//a táblázat fejlécét létrehozzuk
        table.appendChild(thead);//hozzáadjuk a fejlécet a táblázathoz
        const theadRow = document.createElement('tr');//létrehozzuk a fejlécben lévő sort
        thead.appendChild(theadRow);//a fejlécben lévő sort hozzáadjuk a fejléchez
        const theadCells = ['név', 'születési dátum', 'irányítószám'];//egy tömb amely tartalmazza a fejléc string értékeit
        for(const cellContent of theadCells){//a tömb elemein végig iterálunk
            const thcell = document.createElement('th');//létrehozzuk a fejléc cellát
            thcell.innerText = cellContent;//a fejléc cella megkapja a tömb elemét mint tartalom
            theadRow.appendChild(thcell);//a cellát hozzáadjuk a sorhoz
        }
        const tbody = document.createElement('tbody');//létrehozzuk a táblázat tőrzsét
        table.appendChild(tbody);//a táblázat tőrzsét hozzáadjuk a táblázathoz
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
     */
    constructor(cssClass){
        super(cssClass);//meghívja a Area-ban lévő konstruktort a cssClass paraméterrel  
        const form = document.createElement('form');//létrehozzuk a form elementet
        this.div.appendChild(form);//hozzáadjuk a formot a divhez
        const fieldElementList = [//egy lista amely tartalmazza a field ID-ját és a tartalmát
        {fieldid: 'name',fieldLabel: 'név'},//név cella
        {fieldid: 'birth',fieldLabel: 'születési év'},//születési év cella
        {fieldid: 'zipcode',fieldLabel: 'irányítószám'}]//irányítószám cella
        
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