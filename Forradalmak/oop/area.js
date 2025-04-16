/**
 * létrehoztunk egy Area nevű osztályt amely tartalmaz 1 konstruktor
 * az osztályban lévő konstruktorban történik meg a div-ek létrehozása
 */
class Area{
    
    #div;//egy privát változó a area osztálynak

    #manager//privát változó
    /**
     * getter függvény a div változónak amelyt visszaadd
     * @returns {HTMLDivElement}a létrehozott div
     */
    get div(){
        return this.#div;//vissza tér a privát divvel
    }

    get manager(){
        return this.#manager;//vissza tér a privát divvel
    }

    /**
     * A konstruktor feladata a div elkészítése és osztálya beállítása paraméter szerint a privátmetódus által létrejött containerben
     * @param {string} className //a string paraméter amely a osztály nevet tartalmazza
     * @param {Object} manager - A manager objektum, a személyek kezelésést szolgálja
     */
    constructor(className, manager){//konstruktor és string típusú className paramétere
        this.#manager = manager; // Inicializálja a manager-t
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
     * table konstruktora amely feladata a táblázat tőrzsének kitöltése
     * meghívjuk az ősosztályban lévő konstruktort és létrehozzuk a táblázatott
     * @param {string} cssOsztaly a cssOsztály amely által létrehozzuk a divet
     * @param {Object} manager A manager objektum, a személyek kezelésést szolgálja
     */
    constructor(cssOsztaly, manager){
        super(cssOsztaly, manager);//meghívjuk az ősosztálynak konstruktorát és létrehozunk egy divet
        const tbody = this.#createTable();//meghívjuk a privát függvény amely által létrehozzuk a táblázatott, fejlécet.
        this.manager.setAddPersonCallback((pers) => {//callback függvény meghívása
            const tableBodyRow = document.createElement('tr');//létrehozz a tőrzsnek egy sort
            
            const nameCell = document.createElement('td');//létrehozza a cellát
            nameCell.textContent = pers.name;//a cella tartalmát feltöltjük a személy nevével
            tableBodyRow.appendChild(nameCell);//hozzáadjuk a sorhoz a cellát

            const birthCell = document.createElement('td');//létrehozza a cellát
            birthCell.textContent = pers.birth;//a cella tartalmát feltöltjük a személy születés évével
            tableBodyRow.appendChild(birthCell);//hozzáadjuk a cellát a sorhoz

            const zipcodeCell = document.createElement('td');//létrehozzuk a cellát
            zipcodeCell.textContent = pers.zipcode;//a cella tartalma megkapja a személy irányítószámát
            tableBodyRow.appendChild(zipcodeCell);//a cellát hozzáadjuk a sorhoz
            tbody.appendChild(tableBodyRow);//a sort hozzáadjuk a tőrzshöz
        })
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

    #formFieldArray;//létrehoztunk egy privát változónak

    /**
     * a form létrehozásáért felelős konstruktor
     * @param {string} cssClass a paraméter amely az osztály nevet tartalmazza és aszerint hozza létre a divet
     * @param {Array} fieldElementList a lista amely tartalmazza a field ID-ját és tartalmát
     * @param {Object} manager A manager objektum, a személyek kezelésést szolgálja
     */
    constructor(cssClass, fieldElementList, manager){
        super(cssClass, manager);//meghívja a Area-ban lévő konstruktort a cssClass paraméterrel  
        this.#formFieldArray = []; //a privát változónak megadunk egy üres tömböt
        const form = document.createElement('form');//létrehozzuk a form elementet
        this.div.appendChild(form);//hozzáadjuk a formot a divhez

        for(const fieldElement of fieldElementList){//végig iterálunk a megadott tömbön
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel);//létrehozunk egy új FormFieldet
            this.#formFieldArray.push(formField);//a privát tömbbe bepusholjuk a formfieldet
            form.appendChild(formField.getDiv());//a formhoz hozzadjuk a formfielden belül meghívott getDiv függvényt
        }
        
        const button = document.createElement('button');//létrehozzuk a gomb elementet
        button.textContent = 'hozzáadás';//a gomb belső szövegét feltöltjük
        form.appendChild(button)//a gombot hozzáadjuk a fromhoz
        form.addEventListener('submit', (e)=> {//az event listener amely azt figyeli hogy megtörtént a submit és ha igen akkor az inputokból lévő adatokat a cellákba rakja
            e.preventDefault();//megoldaja hogy a weboldal betöltésénél ne fusson le az addeventlistener
            const inputFieldList = e.target.querySelectorAll('input');//kiválasztjuk az összes inputot
            const valueObject = {};//létrehozunk egy tömböt amely az inputok értékeit nézi meg
            for(const inputField of inputFieldList){//végig iterálunk a tömbön amely tartalmazza az input értékeit
                valueObject[inputField.id] = inputField.value;//a valueObject tömbbe berakjuk az inputok értékeit
            }
            const person = new Person(valueObject.name, Number(valueObject.birth), Number(valueObject.zipcode));//létrehozunk egy új személyt
            this.manager.addPerson(person);//a személyt hozzáadjuk a managerhez
        })
    }
}

/**
 * Az osztály felelős a formon belüli input, labelek, spanek létrehozásáért egyben a fieldDiv létrehozásáért
 */
class FormField {
    #id;//privát változó
    #inputElement;//privát változó
    #labelElement;//privát változó
    #errorElement;//privát változó

    get id(){//getter függvény az id-nak
        return this.#id;//visszatér a privát id változóval
    }

    get value(){//getter függvény az inputElement értékének
        return this.#inputElement.value;//visszatér az inputelement értékével
    }

    /**
     * egy setter függvény amely által definiáljuk az error értékét
     * @param {string} value 
     */
    set error(value){//setter függvény
        this.#errorElement.textContent = value;//az errornak tartalma megkapja a paraméternek megadott értéket
    }

    /**
     * a FormField konstruktora
     * a konstruktor felelős a fieldek tartalmának létrehozásáért és feltöltéséért
     * @param {string} id //a label és input ID-ja amely string típusu
     * @param {string} labelContent //a label tartalma amely string típusu
     */
    constructor(id, labelContent){
        this.#id = id;//a privát változó megkapja az id értékét
        this.#labelElement = document.createElement('label');//létrehozunk egy label elmentet
        this.#labelElement.htmlFor = id;//a label For-ja megkapja az id paramétert
        this.#labelElement.textContent = labelContent;//a label tartalmát megkapja a labelContent paramétert
        this.#inputElement = document.createElement('input');//létrehozom az input elementet
        this.#inputElement.id = id;//az inputElement id tulajdonsága megkapja a id paramétert
        this.#errorElement = document.createElement('span');//létrehozunk egy span-t amely az errort fogja kiirni
        this.#errorElement.className = 'error';//a span megkapja az error-t mint osztály nevet
    }

    /**
     * a függvény felese a field div létrehozásáért
     * @returns {htmlDivElement} a visszaadott div
     */
    getDiv(){
        const div = makeDiv('field');//létrehozunk egy field osztályú divet
        const br1 = document.createElement('br')//létrehozunk egy sortörést
        const br2 = document.createElement('br')//létrehozunk egy sortörést
        const htmlElements = [this.#labelElement, br1, this.#inputElement, br2, this.#errorElement];//létrehoztunk egy tömböt és felépítjük hogy hogy fogkinézni a field
        for(const element of htmlElements){//végig iterálunk a htmlElements tömbön
            div.appendChild(element); //hozzáaddjuk a divhez az elemet
        }
        return div;//visszatérünk a divvel
    }
}