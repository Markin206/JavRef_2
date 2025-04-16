//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * létrehoztunk egy függvényt amely egy className string paramétert megkapja,
 * és a div létrehozása után a div tulajdonságként megkapja a className paramétert,
 * ezek után meg a div-et vissza adjuk
 * @param {string} className //az elem amelyet majd a div megkap
 * @returns {HTMLDivElement}// a vissza adott div létrehozás után
 */
const makeDiv = (className) => {//függvény létrehozása egy bemeneti paraméterrel ami a className lesz
    const div = document.createElement('div');//létrehozzuk a div elementett egy div változóba
    div.className = className;//a div className tulajdonságához hozzá adjuk a className paramétert
    return div;//vissza adjuk a div értéket
}

//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * A függvény feladata az inputok létrehozása és a megadott
 * id és az input típusa alapján
 * @param {string} id az input ID-ja
 * @param {string} type az input típusa
 * @returns {HTMLInputElement} a létrehozott input
 */
const makeInput = (id, type) => {
    const input = document.createElement('input')//létrehozunk egy input elementett
    input.id = id;//az input id-ja megkapja a megadott id értékét
    input.type = type;//az input type-ja megkapja a megadott type értékét
    return input //visszatérünk a létrehozott inputtal
}

//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * a táblázat és annak fejléce létrehozásáért felelős függvény
 * @param {HTMLDivElement} container az a div elem amelyhez a táblázatott adom
 * @param {function(HTMLElement): void} callback a callback függvény amely által eldöntjük hogy mit csinálunk a tbodyban
 */
const createTable = (container, callback) =>{
    const tableDiv = makeDiv('table');//létrehozzuk a table osztályú divet a makeDiv függvényel
    container.appendChild(tableDiv);//hozzáadjuk a containerhez a táblázat divjét
    const tableSim = document.createElement('table');//létrehozunk egy táblázatott
    tableDiv.appendChild(tableSim);//hozzáadjuk a table osztályú divhez a táblázatott
    const tableHead = document.createElement('thead');//létrehozzuk a fejlécet a táblázattnak
    tableSim.appendChild(tableHead);//a fejlécet hozzáadjuk táblázathoz
    const tableHeadRow =  document.createElement('tr');//létrehozzuk a fejléc sorát
    tableHead.appendChild(tableHeadRow)//a fejléc sorát hozzáadjuk a fejléchez
    const theadCells = ['név', 'születési dátum', 'irányítószám'];//létrehozzunk egy string típusú tömböt amely tartalmazza 'név', 'születési dátum', 'irányítószám' értéket amely a táblázat fejléce lesz
    for(const cellContent of theadCells){// a tömbön végigiterálunk cellContent néven
        const thcell = document.createElement('th');//létrehozzuk a fejlécnek cella elemét
        thcell.innerText = cellContent;//a cella belső értéket a tömb egyik eleme lesz
        tableHeadRow.appendChild(thcell);//a cellát hozzáadjuk a fejléc sorához
    }
    const tbody = document.createElement('tbody');//létrehozzuk a táblázat tőrzsét
    tableSim.appendChild(tbody);//hozzáadjuk a táblázathoz a táblázat tőrzsét
    callback(tbody);// meghívjuk a callback-et a <tbody> elem átadásával
}
//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * A függvény feladata az hogy a formot létrehozza és müködtese és validálja az inputokat és értékeit a táblázatba helyezze el
 * @param {HTMLTableSectionElement} tablebody a tbody amelybe belerakom az inputokban megadott értékeket
 * @param {HTMLDivElement} container a container amelybe bele helyezem a formot
 * @param {Array} personArray a tömb amelybe felpusholjuk a megadott input értékeke
 */
const createForm = (tablebody, container, personArray) => {
    const formDiv = makeDiv('form');//létrehozunk egy divet amely a form osztályt tartalmazza a makeDiv függvény által
    container.appendChild(formDiv);//a containerhez hozzáadom a form divjét
    const formSim = document.createElement('form');//létrehozzuk a form elementet
    formDiv.appendChild(formSim)//a formot hozzáadjuk a formDivhez

    const fieldElementList = [//egy lista amely tartalmazza a field ID-ját és a tartalmát
        {fieldid: 'name',fieldLabel: 'név'},//név cella
        {fieldid: 'birth',fieldLabel: 'születési év'},//születési év cella
        {fieldid: 'zipcode',fieldLabel: 'irányítószám'}]//irányítószám cella

    for(const fieldElement of fieldElementList){//egy for ciklussal végig iterláunk a fieldElementList tömbön és benne létrehozzuk a fieldeket annak label-jét, input-ját és tulajdonságait
        const field = makeDiv('field');//létrehozzuk a field osztályú divet a makeDiv függvénnyel
        formSim.appendChild(field);//hozzáadjuk a field osztályú divet a formhoz
        const label = document.createElement('label');//létrehozzuk a field label elementjét
        label.htmlFor = fieldElement.fieldid;//a labelnek megadunk egy htmlFor tulajdonság ami az elem fieldid-ja lesz
        label.textContent = fieldElement.fieldLabel;//a labelnek megadunk egy textContent tulajdonság ami az elem fieldLabelje lesz
        field.appendChild(label)// a labelt hozzáadjuk a field osztályú divhez
        const input = makeInput(fieldElement.fieldid, 'text')//a makeInput függvényel létrehozok egy inputot
        field.appendChild(document.createElement('br'))//a divhez hozzáadunk a benne létrehozott sortörést
        field.appendChild(input)//az inputot hozzáadjuk a divhez
        const error = document.createElement('span');//létrehozunk egy span elementet
        error.className = 'error';//az osztály neve error lesz
        field.appendChild(error);//hozzáadjuk a spant a fieldhez
    }
    const buttonFormSim = document.createElement('button');//létrehozzuk a gomb elementet
    buttonFormSim.textContent = 'hozzáadás';//a gomb belső szövegét feltöltjük
    formSim.appendChild(buttonFormSim)//a gombot hozzáadjuk a fromhoz

    /**
     * létrehozunk egy addEventListener függvényt amely a submit esetén fut le
     * a függvény feladata a inputok adatai behelyezése a cellákba
     */
    formSim.addEventListener('submit', (e)=> {
        e.preventDefault();//megoldja hogy a weboldal betöltésénél ne fusson le a program
        const valueObject = {}//létrehozunk egy objektumot
        const inputFields = e.target.querySelectorAll('input');//kiválasztjuk az összes inputot amelyt vissza adjuk a inputFieldsbe
            
        let valid = true;//létrehozunk egy bool változót amely alapértelmezett értéke true
        for(const inputField of inputFields){//végig iterálunk az inputokon
            const error = inputField.parentElement.querySelector('.error');//az inputoknak parent elementjénél kiválasztjuk az error osztályt rendelkező elementet
            if(!error){//ha nincs semmilyen error akkor belép
                console.error('nincs errorfield');//létrehozz egy error objektumot és kiiratja "nincs errorfield"
                return;//visszatérés
            }
            error.textContent = '';//lenullázuk az error szövegét
            if(inputField.value === ''){//ha inputField értéke null akkor belép
                error.textContent = 'Kotelezo megadni';//kitölti az error tartalmát egy stringel
                valid = false;//a bool értékét falsera rakja
            }
            valueObject[inputField.id] = inputField.value;//az elem értékével feltöltjük a valueObject indexén lévő elemet amely az elem ID-ja lesz
        }
        if(valid){//megnézi a valid bool értékét
        personArray.push(valueObject);//a valueObject-et felnyomjuk a megadott tömbbe
        addRow(valueObject, tablebody);//létrehozzuk a sorokat a valueObject alapján és eltároljuk a tablebodyba
        }
    })
}

//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * A függvény által feltudjuk tölteni a fájlainkat a weboldalra
 * @param {HTMLTableSectionElement} tablebody 
 * @param {HTMLDivElement} container 
 * @param {array} personArray 
 */
const createFileUpload = (tablebody, container, personArray) => {
    const fileInput = makeInput('fileinput', 'file')//létrehozunk egy inputot a makeInput függvény alapján amely idja a fileInput lesz és típusa pedig file
    container.appendChild(fileInput);//az inputot belerakjuk a container divbe
    fileInput.addEventListener('change', (e) => {//az input változását figyeli az addeventlistener
        const file = e.target.files[0];//bekéri az első fájlt az inputból
        const fileReader = new FileReader();//létrehozunk egy FileReader-t amely által beolvashatunk fájlokat
        fileReader.onload = () => {//beolvassuk fájlt
        const fileLines = fileReader.result.split('\n')//a fájlt szét szedjuk sorvégenkén
        const removedHeadLines = fileLines.slice(1);//létrehozunk egy tömböt az első elem kihagyásával
        for(const line of removedHeadLines){//végig iterálunk a tömbön
                const trimmedLine = line.trim();//a sorban lévő stringből eltávolítjuk a szóközöket
                const fields = trimmedLine.split(';');//feldaraboljuk a sort
                const pers = {//létrehozunk egy objektumot
                    name: fields[0],//a name megkapja a feldarabolt sor 1. elemét
                    birth: fields[1],//a birth megkapja a feldarabolt sor 2. elemét
                    zipcode: fields[2]//a zipcode megkapja a feldarabolt sor 3. elemét
                }
                personArray.push(pers);//felnyomjuk a tömbe az objektumunkat
                addRow(pers, tablebody)//létrehozzuk a sort
            }   
        }
        fileReader.readAsText(file);//beolvasuk a szöveges fájlunkat
        })
    }
/**
 * Hozzáad egy új sort a táblázat törzséhez a megadott objektum alapján.
 * @param {{name: string, birth: string, zipcode: string}} object A személy adatait tartalmazó objektum
 * @param {HTMLTableSectionElement} tablebody Az a tbody> elem, ahova a sort hozzáadjuk
 */
const addRow = (object, tablebody) => {
    const tableBodyRow = document.createElement('tr');//létrehozzuk a sort
    tablebody.appendChild(tableBodyRow);//hozzáadjuk a megadott tbodyhoz
    const nameCell = document.createElement('td');//létrehozzuk a cellát amely a nevet tartalmazza
    nameCell.textContent = object.name;//a cella tartalmát feltöltjük az objektum name-vel
    tableBodyRow.appendChild(nameCell);//hozzáadjuk a sorhoz a cellát
    const birthCell = document.createElement('td');//létrehozzuk a cellát amely a születés évet tartalmazza
    birthCell.textContent = object.birth;//a cella tartalmát feltöltjük az objektum birth-vel
    tableBodyRow.appendChild(birthCell);//hozzáadjuk a sorhoz a cellát
    const zipCodeCell = document.createElement('td');//létrehozzuk a cellát amely a irányítószámot tartalmazza
    zipCodeCell.textContent = object.zipcode;//a cella tartalmát feltöltjük az objektum zipcode-val
    tableBodyRow.appendChild(zipCodeCell);//hozzáadjuk a sorhoz a cellát
}
//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * A letöltésért felelős függvény
 * @param {HTMLDivElement} container a container div element amelybe a gombot belerakjuk
 * @param {Array} personArray a tömb amelyen végigiterálunk és elmentjük értékeit
 */
const createFileDownload = (container, personArray) => {
    const exportButton = document.createElement('button');//létrehozunk egy gombot
    exportButton.textContent = 'Letöltés';//a gomb tartalmát kitöltjük egy string értékkel
    container.appendChild(exportButton);//a gombot hozzáadjuk a containerhez
    exportButton.addEventListener('click', () => {//addeventlistener amely a click-et figyeli a gombnál
        const link = document.createElement('a');//létrehozunk egy anchor linket
        const contentArray = ['name;birth;zipcode']//létrehozunk egy tömböt amely tartalmaz string értékeket
        for(const pers of personArray){//végig iterálunk a tömbön amely tárolta a táblázat elemeit
            contentArray.push(`${pers.name};${pers.birth};${pers.zipcode}`);//a contentarray tömbe felpusholjuk a a táblázat elemeit
        }
        const content = contentArray.join('\n');//a tömbött sorvégenként kombináljuk egy string-é
        const file = new Blob([content])//eltároljuk az egységes stringet egy bloba mint nyers bináris adat
        link.href = URL.createObjectURL(file);//a link href property-je megkapja az újonnan létrehozott URL objektumot amely a fájlból készült
        link.download = 'newdata.csv'//letöltjük az új fájlt newdata.csv néven
        link.click();//linkek meghívjuk a beépített click függvényt
        URL.revokeObjectURL(link.href);//kiürítjük az URL-t
    })
}

//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * A függvény azért felel hogy a megadott tömböl kiszürjük az adatokat a callback segítségével
 * @param {Array} personArray ebből a függvényből szürünk
 * @param {function(*): boolean} callback a szűrési feltételt meghatározó függvény
 * @returns {Array} a szürt tömb
 */
const filter = (personArray, callback) => {
    const result = [];//létrehozunk egy üres tömböt
    for(const element of personArray){//a paraméterben megadott tömbön végigiterálunk
        if(callback(element)){//megnézi a callback függvényel hogy ez a elem berakhatő a szűrt tömbbe
            result.push(element);//a szűrt tömbbe felpusholjuk az elementet
        }
    }
    return result;//visszatérünk a resultal
}

//--------------------------------------------------------------------------------------------------------------------------------------
/**
 * ez a függvény felelős a szűrés elvégzéséhez
 * létrehoz egy selectet, inputot, gombot
 * amelyek által a kiszűrjük és eltároljuk egy külön tömbbe a szűrt adatot
 * és aztán ki is irattjuk
 * @param {HTMLDivElement} container a container div element amely tartalmazni fogly a select-et, input-ot, gomb-ot
 * @param {HTMLTableSectionElement} tablebody a tablebody amelybe a kiiratásnál dolgozunk
 * @param {Array} personArray az a tömb amelyt kiszűrünk
 */
const createFilterForm = (container, tablebody, personArray ) => {
    const filterFormDiv = makeDiv('filterForm')//létrehozunk egy divet amely a filterForm osztály nevet kapja meg a makeDiv függvény segítségével
    container.appendChild(filterFormDiv);//a divet hozzáadom a containerhez
    const formForFilter = document.createElement('form');//létrehozunk egy formot
    filterFormDiv.appendChild(formForFilter);//a formot hozzáadjuk a filter divhez
    const select = document.createElement('select');//létrehozunk egy selectet
    formForFilter.appendChild(select);//a létrehozott selectet hozzadjuk a formhoz
    const options = //létrehozzuk egy tömböt amely tartalmazza a szűrés opciókat
    [{value: '',innerText: ''},//alap érték || semmi által szürünk
    {value: 'birth',innerText: 'születési dátum'},//évszám szerint szűrünk
    {value: 'zipcode',innerText: 'irányítószám'}]//az irányítószám szerint szűrűnk
    for(const option of options){//végig megyünk a tömbön mely tartalmazza az opciókat
        const optionElement = document.createElement('option');//létrehozunk egy option elementet
        optionElement.value = option.value;//az option element értéke megkapja az elem értékét
        optionElement.innerText = option.innerText//a opion element tartalmát feltöltjük az elem text értékével
        select.appendChild(optionElement);//a selecthez hozzá appendeljük az optionElementet
    }
    const input =  makeInput('filterInput', 'text');//létrehozunk egy inputot a makeInput függvény segítségével az input idja filterInput és típusa text
    formForFilter.appendChild(input);//és hozzáadjuk a formhoz
    const button = document.createElement('button');//létrehozunk egy gombot
    button.innerText = 'Szures';//tartalmát feltöltjük egy string értékkel
    formForFilter.appendChild(button);//a gombot hozzáadjuk a formhoz
    formForFilter.addEventListener('submit', (e) => {//létrehozunk a form egy addEventListener-t amely a submit eseményt figyeli
        e.preventDefault();//ezáltal nem fut le az esemény önmagától a weboldal betöltésénél
        const filterInput = e.target.querySelector('#filterInput');//kiválasztjuk az összes inputot amely tartalmazza a #filterInput osztályt
        const select = e.target.querySelector('select');//kiválasztjuk a formon belüli select osztályú elementeket
        const filteredArray = filter(personArray, (element) => {//létrehozunk egy új tömböt amely a megadott tömböt szűri az element paraméter alapjánt
            if(select.value == 'birth'){//ha a select értéke megegyezik a birth-el akkor azzal szűr
                if(filterInput.value === element.birth){//megnézi a filterinput értékét hogy egyenlő-e az element birth tulajdonsággal
                    return true;//azon esetben ha igen akkor visszatérünk trueval
                }
            }else if(select.value == 'zipcode'){//létrehozunk egy else if-et amely ha a select értéke zipcode akkor irányítószám szerint szűr
                if(filterInput.value === element.zipcode){//ha az input értéke megegyezik az element zipcode tulajdonságával akkor lefut
                    return true;//visszatér a true-val
                }
            }else{//ha ez mind nem igaz akkor csak ki iratja
                return true;//visszatér a true-val
            }
        })

        tablebody.innerHTML = '';//nullázuk a tbody tartalmát
        for(const filteredElement of filteredArray){//végigjárunk a szűrő tömbön
            addRow(filteredElement, tablebody)//létrehozzuk a sorokat elemenként a megadott tablebodyba
        }
    })
}