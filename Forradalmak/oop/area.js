/**
  * létrehoztunk egy Area nevű osztályt amely tartalmaz 1 konstruktor
  * az osztályban lévő konstruktorban történik meg a div-ek létrehozása
  */
class Area{

    #div;//a privát változó amely a divek tárolásával fog foglalkozni

    #manager//a privát változó amelyben eltároljuk a manager objektumot

    get div(){//a div getter függvénye (eltárolja a divvet)
        return this.#div;//visszatér a divvel
    }

    get manager(){//a manager getter fügvénye (eltárolja a manager objektumot)
        return this.#manager;//visszatér a privát változóval
    }

    /**
      * A konstruktor feladata a div elkészítése és osztálya beállítása paraméter szerint a privátmetódus által létrejött containerben
      * @param {string} className //a string paraméter amely a osztály nevet tartalmazza
      * @param {object} manager A manager objektum, a személyek kezelésést szolgálja
      */
    constructor(className, manager){//konstruktor és string típusú className paramétere
        this.#manager = manager;// Inicializálja a manager-t
        const container = this.#getContainerDiv();//meghívjuk a containerDiv privát metódust hogy megnézzük hogy létezik a div vagy sem és ha nem akkor létrehozzon egyet
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

    /**
     * A gomb létrehozása
     * @param {string} label a gomb tartalma
     * @returns {HTMLButtonElement} a gomb amellyel viszatér
     */
    createButton(label){
        const button = document.createElement('button');//létrehozzuk a gombot
        button.textContent = label;//a gomb tartalmát feltöltjük a paraméterrel
        return button//visszatérünk a gombbal
    }
}


//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * ezzel a extension osztályjal érjük el a táblázat fejléc létrehozását
 * a Table ősosztálya az Area osztály
 */
class Table extends Area {
    

    /**
     * //a table konstruktora ahol létrehozzuk a táblázatott és tőrzsét feltöltjük
     * a manager által
     * @param {string} cssClass ezzel a paraméterrel hozzuk létre a divet az area osztály konstruktorával
     * @param {{setAddWorkCallback: function(Function): void, setRenderTableCallback: function(Function): void}} manager a manager objektum amely a callback elérhetőségét okoza
     */
    constructor(cssClass, manager){
        super(cssClass, manager);//meghívjuk az Area konstruktorát és létrehozunk egy divet vele
        const tbody = this.#createTable();//meghívjuk a privát függvényt és hozzáadjuk a tbody változóhoz
        this.manager.setAddPersonCallback(this.#addPersonCallback(tbody))//meghívjuk a managerben lévő callback függvényt a privát metódussal
        this.manager.setRenderTableCallback(this.#renderTableCallback(tbody))//frissítjük a setRenderTableCallback által a táblázatott a privát metódus paraméterel
    }

    /**
     * létrehozunk egy sort a szerzőnek
     * @param {HTMLTableSectionElement} tbody a táblázat tőrzse amelyhez hozzárendeljük a sorokat
     * @returns {(person: { name: string, birth: Number, zipcode: Number }) => void} a szerző amelyt visszaadunk
     */
    #addPersonCallback(tbody){
        return (person) => {
            this.#createPersonRow(person, tbody);
        }
    }

    /**
     * teljesen újrafrissítjük a táblázatott a function-nel
     * @param {HTMLTableSectionElement} tbody a táblázat tőrzse amelyhez hozzárendeljük a sorokat
     * @returns {(personArray: { name: string, birth: Number, zipcode: Number }[]) => void} a tömb amelyt frissítünk az új adatokal
     */
    #renderTableCallback(tbody){
        return (personArray) => {
            tbody.innerHTML = '';//a táblázat tőrzsét kiürítjük
            for(const person of personArray){//végig iterálunk a tömbön amely tartalmazza a táblázat tartalmát
                this.#createPersonRow(person, tbody);//létrehozzuk a sorokat és cellákat a createRow által
            }
        }
    }

    /**
     * a sort létrehozó privát function
     * @param {{ name: string, birth: Number, zipcode: Number }} pers az objecktum amely tartalmazza a szerző adatai (neve, mufaj, cim)
     * @param {HTMLTableSectionElement} tablebody a táblázat tőrzse amelyhez hozzárendeljük a sort
     */
    #createPersonRow(person, tablebody){
            const tableBodyRow = document.createElement('tr');//létrehozzuk a sort
            this.#createCell(tableBodyRow, person.name)//cella létrehozása és hozzáadása a sorhoz
            this.#createCell(tableBodyRow, person.birth)//cella létrehozása és hozzáadása a sorhoz
            this.#createCell(tableBodyRow, person.zipcode)//cella létrehozása és hozzáadása a sorhoz
            tablebody.appendChild(tableBodyRow);//sor hozzáadása a táblázat tőrzséhez
    }

    /**
     * Itt hozzuk létre a cellákat és töltjük fel tartalmukat
     * @param {HTMLTableRowElement} row ehhez a sorhoz füzzük hozzá a cellát
     * @param {string} textContent a cella tartalma
     * @param {string} type a cella tipusa amely kell a cella létrehozásához
     */
    #createCell(row, textContent, type='td'){//a meghívás esetén a type paraméter már alap értéknek megkapja a 'td' értéket ezáltal meghiváskor type paramétert nem kell megadni
        const cell = document.createElement(type);//létrehozunk egy cellát
        cell.textContent = textContent;//a cella tartalmát feltöltjük a textContent paraméterrel
        row.appendChild(cell);//hozzáadjuk a megadott sorhoz a cellát
    }

    /**
     * Ezzel a function-nel fogjuk létrehozni a táblázatott
     * @returns {HTMLTableSectionElement} a visszaadot tbody element
     */
    #createTable(){
        const table = document.createElement('table');//létrehozunk egy table elementet
        this.div.appendChild(table);//a table elementet hozzáadjuk a létrehozott divhez
        const thead = document.createElement('thead');//létrehozzuk a fejlécet
        table.appendChild(thead);//a fejlécet hozzáadjuk a táblázathoz
        const theadRow = document.createElement('tr');//létrehozzuk a fejléc sorát
        thead.appendChild(theadRow);//a fejléc megkapja a fejléc soárt
        const theadCells = ['név', 'születési dátum', 'irányítószám'];
        for(const cellContent of theadCells){//végig iterálunk a tömb egyes elemein
            this.createCell('th', cellContent, theadRow);//meghívjuk az ősosztályban lévő metódus amely által létreohzzuk a fejléc celláit
        }
        const tbody = document.createElement('tbody');//létrehozunk a táblázat tőrzsét
        table.appendChild(tbody);//a táblázathoz hozzáadjuk a tőrzsét
        return tbody;//visszatérünk a táblázat tőrzsével
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * ezzel a extension osztályjal érjük el a form létrehozását
 * a Form ősosztálya az Area osztály
 */
class Form extends Area {

    /**
     * @type {{ fieldid: string, fieldLabel: string }[]}
     */
    #formFieldArray//privát tömb

    /**
     * //A form konstruktora ahol létrehozzuk a formot és annak fieldjeit
     * @param {string} cssClass az osztály amely a div osztálya lesz
     * @param {{ fieldid: string, fieldLabel: string }[]} fieldElementList a tömb amely tartalmazza a field tulajdonságait
     * @param {{ addPerson: function }} manager a manager amely által elérjük a managerben lévő tömböt amelyhez hozzáadjuk az új személyeket
     */
    constructor(cssClass, fieldElementList, manager){
        super(cssClass, manager);//meghívjuk az Area konstruktorát hogy létrehozzuk a Form div elementét
        this.#formFieldArray = []; //a privát változónak megadunk egy üres tömböt
        const form = this.#createForm(fieldElementList); //meghívjuk a #createForm privát metódust amely létrehozza a formot és mezőket
        form.addEventListener('submit', this.#formsubmitEventListener()); //a formhoz eseményfigyelőt rendelünk amely a submit eseményre reagál
    }

    /**
     * Létrehozza a formot és a fieldjeit, hozzáadja a gombot is
     * @param {{ fieldid: string, fieldLabel: string }[]} fieldElementList a mezők leírásait tartalmazó tömb
     * @returns {HTMLFormElement} a létrehozott form elem
     */
    #createForm(fieldElementList){
        const form = document.createElement('form');//létrehozzunk egy formot
        this.div.appendChild(form);//az újonnan létrehozott divhez hozzáadjuk a formot
        for(const fieldElement of fieldElementList){//végig iterálunk a megadott tömbön
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel);//létrehozunk egy új FormFieldet
            this.#formFieldArray.push(formField);//a privát tömbbe bepusholjuk a formfieldet
            form.appendChild(formField.getDiv());//a formhoz hozzadjuk a formfielden belül meghívott getDiv függvényt
        }
        const button = document.createElement('button');//létrehozunk egy gomb elementet
        button.textContent = 'hozzáadás';//a tartalmát feltöltjük a hozzáadás string értékkel
        form.appendChild(button)//a gombot hozzáadjuk a formhoz

        return form;//visszatérés a formmal
    }

    /**
     * A formhoz tartozó eseményfigyelő függvény, amely kezelni fogja az űrlap beküldését
     * @returns {Function} a callback függvény amit a submit eseménykor hív meg
     */
    #formsubmitEventListener(){
        return (e) => {//létrehozzunk egy addeventlistenert amely a formon belül figyel a submit eseményre
            e.preventDefault();//a weboldal betültése esetén az esemény nem fut le alapból
            
            const valueObject = this.#getValueObject(); //értékek lekérdezése
            if(this.#validateAllFields()){//ha a validációnál mindenrendben akkor létrehozza az új személyt és hozzáadja a tömbbe amit a managerben található
                const person = new Person(valueObject.name, Number(valueObject.birth), Number(valueObject.zipcode));//létrehozunk egy újszemélyt amelynek 2 tulajdonságát (birth, zipcode) Number tipusra alakítunk
                this.manager.addPerson(person);//hozzáadjuk a managerben lévő tömbhöz az új személyt
            } 
        }
    }

    /**
     * Validálja az inputokat
     * @returns {boolean} a validáció értéke ha mindegyik jó akkor true
     */
    #validateAllFields(){
        let valid = true;//létrehozunk egy booleant változó amely alapértéke true lesz || ezze a változóval fogjuk elérni hogy sikertelen validáció esetén ne lehessen semmit sem adni a táblázathoz
        for(const formField of this.#formFieldArray){//az input értékein végig iterálunk
            formField.error = '';//kiürítjük a formfield error(span) tartalmát
            if(formField.value === ''){//ha az formfield input értéke null vagy undefined akkor hibát ír ki és a valid változó értékét false-ra változtatja
                formField.error = 'Kotelezo megadni';//a hiba üzenet amelyt a span elementek kiiratnak
                valid = false;//a valid értéke átváltozik falsera
            }
        }
        return valid;//a visszatérő validált érték (false vagy true)
    }

    /**
     * Egy objektumba összegyűjti az összes input mező aktuális értékét
     * @returns {[id: string]: string }} egy objektum amelyben az inputok id-jához tartozó értékek szerepelnek
     */
    #getValueObject(){
        const valueObject = {};//létrehozunk egy üres objektumot
        for(const formField of this.#formFieldArray){//az input értékein végig iterálunk
            valueObject[formField.id] = formField.value;//az objektum indexelt eleme megkapja az input tartalmát
        }
        return valueObject;//visszatérünk az objektummal
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * az area leszarmazott osztálya
 * az osztály feladata a fájlok feltöltése a weboldalra
 */
class UploadDownload extends Area{

    /**
     * a konstruktor létrehoz egy gombot amely text filet
     * olvass be és a fájlt táblázatba helyezi
     * @param {string} cssClass a div osztalya
     * @param {{ addPerson: function(Object): void, generateExportString: function(): string }} manager ez foglalkozik a személyel
     */
    constructor(cssClass, manager){
        super(cssClass, manager);//meghívjuk az area konstruktorát
        const input = document.createElement('input')//létrehozunk egy input elementet
        input.id ='fileinput';//az input id-ja fileInput lesz
        input.type ='file'//input típusa pedig file
        this.div.appendChild(input);//hozzáadjuk a divhez
        input.addEventListener('change', this.#importInputEventListener())//egy addeventlistener amely nézi a htmlElement változásait
        //-------------------------------------------------------------------------------------------------------EXPORT
        const exportButton = document.createElement('button');//létrehozunk egy gombot
        exportButton.textContent = 'Letöltés';//a gomb tartalmát feltöltjük egy string értékel
        this.div.appendChild(exportButton);//a gombot hozzárendeljük a divhez
        exportButton.addEventListener('click', this.#exportButtonEventListener())//egy addeventlistener amely click esemény esetén lefutt
    }

    /**
     * Privát metódus amely visszaadja az exportálást végző eseményfigyelőt
     * @returns {() => void} Eseménykezelő függvény
     */
    #exportButtonEventListener(){
        return () => {
            const link = document.createElement('a');//létrehozunk egy link anchor
            const content = this.manager.generateExportString();//meghívjuk a managerben a generateExportString metódust
            const bom = '\uFEFF'; // BOM karakter hozzáadása az elejére
            const file = new Blob([bom + content])//az egységes stringet eltároljuk egy blob objektumba nyers bináris adatként
            link.href = URL.createObjectURL(file);//a link href property-je megkapja az újonnan létrehozott URL objektumot amely a fájlból készült
            link.download = 'newdata.csv'//a letöltés által newdata.csv néven töltjük le a fájlt
            link.click();//meghívjuk a click függvényt
            URL.revokeObjectURL(link.href);//kiürítjük a href URL-jét
        }
    }

    /**
     * Privát metódus amely visszaadja az importálást végző eseményfigyelőt
     * @returns {(e: Event) => void} Eseménykezelő függvény fájl betöltéshez
     */
    #importInputEventListener(){
        return (e) => {
            const file = e.target.files[0];//kiválasztjuk a fájlt
            const fileReader = new FileReader();//létrehozunk egy FileReader-t amely által beolvashatunk fájlokat
            fileReader.onload = () => {//beolvassuk a fájlt
                const fileLines = fileReader.result.split('\n')//feldaraboljuk a fájlt sorvégek szerint
                const removedHeadLines = fileLines.slice(1);//kiszedjük a tömböt egy külön tömbbe amely nem tartalmazza a fejlécet
                for(const line of removedHeadLines){//végig járunk a tömbön (sorok)
                    const trimmedLine = line.trim();//kiszedjük a szóközöket szavak elején és végén
                    const fields = trimmedLine.split(';');//szét szedjük a sort
                    const person = new Person(fields[0], Number(fields[1]), Number(fields[2]))//létrehozunk egy újszemélyt amelynek a beolvasásnál a 2. és 3. (birth, zipcode) Number tipusra alakítjuk
                    this.manager.addPerson(person)//az új személyt hozzáadjuk a managerhez
                }
            }
            fileReader.readAsText(file);//megoldja hogy a fájlunkat text fájlként olvassa be
        }
    }
}


//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * Az osztály felelős a formon belüli input, labelek, spanek létrehozásáért egyben a fieldDiv létrehozásáért
 */
class FormField {
    /**
     * @type {string}
     */
    #id;//privát változó

    /**
     * @type {HTMLInputElement}
     */
    #inputElement;//privát változó

    /**
     * @type {HTMLLabelElement}
     */
    #labelElement;//privát változó

    /**
     * @type {HTMLSpanElement}
     */
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
     * @returns {HTMLDivElement} a visszaadott div
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