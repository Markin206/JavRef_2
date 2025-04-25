
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

/**
 * A cella létrehozását és tartalma feltöltését végzi el egyben hozzáadja a megadott parent elementhez
 * @param {string} cell a cella tipusa amit létrehozunk
 * @param {string} cellContent a cella tartalma amit akarunk hogy kiirason
 * @param {HTMLTableRowElement} rowElement a sor amelyhez hozzáakarjuk rendelni
 */
const createCell = (cell, cellContent, rowElement) =>{
    const cella = document.createElement(cell);//létrehozzuk a cellát a megadott paraméter alapján
        cella.innerText = cellContent;//a cella tartalmát feltöltjük a cellContent paraméter alapján
        rowElement.appendChild(cella);//a parentElementhez hozzáadjuk a cellát
}

/**
 * Létrehozzuk a sort és a createCell segítségével fel is töltjük cellákkal amelyek
 * tartalmát a megadott paraméterek által
 * és persze hozzárendeljük a sort a megadott tablebodyhoz
 * @param {Object || Array} object az objektum amely tartalmazza a szerző nevét művét és annak címét tehát a cellák adatait
 * @param {HTMLTableSectionElement} tablebody a táblázat tőrzse amelyhez hozzáakarjuk adni
 */
const addRow = (object, tablebody) => {
    const tableBodyRow = document.createElement('tr');//létrehozzunk egy sort
    tablebody.appendChild(tableBodyRow);//a sort hozzáadjuk a megadott táblázat tőrzséhez
    createCell('td',object.name,tableBodyRow);//a createCell által létrehozzuk a táblázat szerző celláját és feltöltjük a megadott objektum name tulajdonságának értékével
    createCell('td',object.mufaj,tableBodyRow);//a createCell által létrehozzuk a táblázat műfaj celláját és feltöltjük a megadott objektum mufaj tulajdonságának értékével
    createCell('td',object.cim,tableBodyRow);//a createCell által létrehozzuk a táblázat cím celláját és feltöltjük a megadott objektum cim tulajdonságának értékével
}

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

//------------------------------------------------------------------------------------------------------------------------------------------------------------- Letöltés gomb
/**
 * A file-ok exportálásért felelős function
 * @param {HTMLDivElement} container a container amelyhez hozzárendeljük a gombot
 * @param {Array} personArray a tömb amely tartalmazza a táblázatt elemeit és amin végig iterálunk beolvasáskor
 */
const createFileDownload = ( container, personArray) => {
    const exportButton = document.createElement('button');//létrehozzunk egy gombot
    exportButton.textContent = 'Letöltés';//gomb tartalmát feltöltjük egy string értékkel
    container.appendChild(exportButton);//a gombot hozzáadjuk a containerhez
    exportButton.addEventListener('click', () => {//a gombnak click eseményt figyelő addevenlistener
        const link = document.createElement('a');//létrehozunk egy anchort
        const contentArray = ['szerző;műfaj;cím']//létrehozzunk egy tömböt amely a file legfelső sorát tartalmazza
        for(const pers of personArray){//végig iterálunk a töm elemein
            contentArray.push(`${pers.name};${pers.mufaj};${pers.cim}`);//a contentarray tömbe felpusholjuk a a táblázat elemeit
        }
        const BOM = '\uFEFF'; // BOM karakter, ami segíti az Excel-t az UTF-8 felismerésében (a betük beolvasásnál volt probléma erre chatgpt kérdeztem meg hogy mi lehet a probléma, elvileg kódolási probléma a Windows-1252 és UTF-8 között)
        const content = BOM+contentArray.join('\n');//a tömbött sorvégenként kombináljuk egy string-é
        const file = new Blob([content])//eltároljuk az egységes stringet egy bloba mint nyers bináris adat
        link.href = URL.createObjectURL(file);//a link href property-je megkapja az újonnan létrehozott URL objektumot amely a fájlból készült
        link.download = 'newdata.csv'//letöltjük az új fájlt newdata.csv néven
        link.click();//linkek meghívjuk a beépített click függvényt
        URL.revokeObjectURL(link.href);//kiürítjük az URL-t
    })
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------- FELTÖLTÉS
/**
 * A function amely az import/feltöltést szolgálja
 * létrehozza a gombot és megoldja hogy a text tipusú file-okat feltöltse a táblázatba
 * @param {HTMLTableSectionElement} tablebody a táblázat tőrzse ahova beszúrjuk a file adatait
 * @param {HTMLDivElement} container a container amelyhez hozzáadjuk az inputot
 * @param {Array} personArray a tömb amelybe felpusholjuk a file adatait
 */
const createFileUpload = (tablebody, container, personArray) => {
    const fileInput = document.createElement('input')//létrehozunk egy inputot
    container.appendChild(fileInput);//az inputot belerakjuk a container divbe
    fileInput.id='fileinput'//a file id-ja fileinput
    fileInput.type = 'file';//az input típusa file-ra alakítjuk át
    fileInput.addEventListener('change', (e) => {//lesz egy addeventListener amely az figyeli hogy változik-e bármi is a weboldalon
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
                    mufaj: fields[1],//a birth megkapja a feldarabolt sor 2. elemét
                    cim: fields[2]//a zipcode megkapja a feldarabolt sor 3. elemét
                }
                personArray.push(pers);//felnyomjuk a tömbe az objektumunkat
                addRow(pers,tablebody);//létrehozzuk a sor és annak celláit az addRow függvény segítségével
            }
        }
        fileReader.readAsText(file);//beolvasuk a szöveges fájlunkat
})}

//------------------------------------------------------------------------------------------------------------------------------------------------------------- TABLE
/**
 * A táblázat létrehozásáért felelős function
 * @param {HTMLDivElement} container a container amelyhez hozzáadjuk a táblázatott
 * @param {Function} callback a callback függvény amely a tbody-val fog foglalkozik
 */
const createTable = (container, callback) => {
    const tableDiv = makeDiv('table');//a tableDiv változóban létrehozzuk a table-t a makeDiv függvénnyel
    container.appendChild(tableDiv)
    const tableSim = document.createElement('table');//létrehozunk egy táblázatott
    tableDiv.appendChild(tableSim);//hozzáadjuk a table osztályú divhez a táblázatott
    const tableHead = document.createElement('thead');//létrehozzuk a fejlécet a táblázattnak
    tableSim.appendChild(tableHead);//a fejlécet hozzáadjuk táblázathoz
    const tableHeadRow =  document.createElement('tr');//létrehozzuk a fejléc sorát
    tableHead.appendChild(tableHeadRow)//a fejléc sorát hozzáadjuk a fejléchez
    const theadList = ['szerző', 'műfaj', 'cím'];//létrehozzunk egy string típusú tömböt amely tartalmazza 'szerző', 'műfaj', 'cím' értéket amely a táblázat fejléce lesz
    for(const cellContent of theadList){// a tömbön végigiterálunk cellContent néven
        createCell('th',cellContent, tableHeadRow);//a createCell függvényel létrehozuk a fejléc cellákat
    }
    const tbody = document.createElement('tbody');//létrehozzuk a táblázat tőrzsét
    tableSim.appendChild(tbody);//hozzáadjuk a táblázathoz a táblázat tőrzsét
    callback(tbody);//meghívjuk a callback függvényt a tbody paraméterrel
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------- FORM létrehozása
/**
 * A form létrehozása és az inputok értékeinek berakása a táblázatba
 * @param {HTMLTableSectionElement} tablebody a táblázat tőrzse amelyhez hozzáadjuk a sorokat és cellákat
 * @param {HTMLDivElement} container a container amelyhez hozzáadjuk a formot
 * @param {Array} personArray a tömb amelybe felpusholjuk az input adatait
 */
const createForm = (tablebody, container, personArray) => {
    const formDiv = makeDiv('form');//létrehozunk egy divet amely a form osztályt tartalmazza a makeDiv függvény által
    const formSim = document.createElement('form');//létrehozzuk a form elementet
    formDiv.appendChild(formSim)//a formot hozzáadjuk a formDivhez
    const fieldElementList = [{//létrehozunk egy tömböt amely tartalmaz 2 tulajdonságot fieldid amely tartalmazza a field Id-jét és fieldLabel amely tartalmazza a szöveget
        fieldid: 'name',//a fieldid tulajdonság megkapja a name string értéket
        fieldLabel: 'Szerző'//a fieldLabel megkapja a Szerző string értéket
    },
    {
        fieldid: 'mufaj',//a fieldid tulajdonság megkapja a mufaj string értéket
        fieldLabel: 'Műfaj'// a field label tulajdonság megkapja a Műfaj string értéket
    },
    {
        fieldid: 'cim',//a fieldid tulajdonság megkapja a cim string értéket
        fieldLabel: 'cím'// a field label tulajdonság megkapja a cím string értéket
    }]

    for(const fieldElement of fieldElementList){//egy for ciklussal végig iterláunk a fieldElementList tömbön és benne létrehozzuk a fieldeket annak label-jét, input-ját és tulajdonságait
        const field = makeDiv('field');//létrehozzuk a field osztályú divet a makeDiv függvénnyel
        formSim.appendChild(field);//hozzáadjuk a field osztályú divet a formhoz
        const label = document.createElement('label');//létrehozzuk a field label elementjét
        label.htmlFor = fieldElement.fieldid;//a labelnek megadunk egy htmlFor tulajdonság ami az elem fieldid-ja lesz
        label.textContent = fieldElement.fieldLabel;//a labelnek megadunk egy textContent tulajdonság ami az elem fieldLabelje lesz
        field.appendChild(label)// a labelt hozzáadjuk a field osztályú divhez
        const input = document.createElement('input');//létrehozzuk a field input elementjét
        input.id = fieldElement.fieldid;//az input id-ját megadjuk az elem fieldid tulajdonságával
        field.appendChild(document.createElement('br'))//a divhez hozzáadunk a benne létrehozott sortörést
        field.appendChild(input)//az inputot hozzáadjuk a divhez
        field.appendChild(document.createElement('br'))//a divhez hozzáadunk a benne létrehozott sortörést
        const error = document.createElement('span');//létrehozunk egy span elementet
        error.className = 'error';//a span az 'error' osztályt kapja meg
        field.appendChild(error);//a spant hozzáadjuk a fieldhez
    }

    const buttonFormSim = document.createElement('button');//létrehozzuk a gomb elementet
    buttonFormSim.textContent = 'hozzáadás';//a gomb belső szövegét feltöltjük
    formSim.appendChild(buttonFormSim)//a gombot hozzáadjuk a fromhoz

    //------------------------------------------------------------------------------------------------------------------------------------------------------------- Hozzáadása a táblázathoz
    /**
     * létrehozunk egy addeventlistener függvényt amely a formon belül figyeli a submit eseményt
     */
    formSim.addEventListener('submit', (e)=> {
        e.preventDefault();//megakadályozza hogy az esemény frissítse a weboldalt
        const valueObject = {}//létrehozunk egy objektumot
        const inputFields = e.target.querySelectorAll('input');//kiválasztjuk az összes inputot amelyt vissza adjuk a inputFieldsbe
        let valid = true;//létrehozunk egy booleant változó amely alapértéke true lesz || ezze a változóval fogjuk elérni hogy sikertelen validáció esetén ne lehessen semmit sem adni a táblázathoz
        for(const inputField of inputFields){//végig iterálunk az inputFields-en
            const error = inputField.parentElement.querySelector('.error');//kiválasztjuk az összes span elementet amely az error osztályt tartalmazza
            if(!error){//ha nem létezik olyan element amely tartalmazza az error osztályt hibát ír ki
                console.error('nincs errorfield');//hibaüzenet kiiratása
                return;//visszatérés
            }
            error.textContent = '';//kiürítjük a span elementeket tartalmát
            if(inputField.value === ''){//ha az input értéke null vagy undefined akkor hibát ír ki és a valid változó értékét false-ra változtatja
                error.textContent = 'Kotelezo megadni';//a hiba üzenet amelyt a span elementek kiiratnak
                valid = false;//a valid értéke átváltozik falsera
            }
            valueObject[inputField.id] = inputField.value;//az elem értékével feltöltjük a valueObject indexén lévő elemet amely az elem ID-ja lesz
        }
        if(valid){//ha a validáció sikeres akkor hozzáadja a cellát a táblázathoz
            personArray.push(valueObject);//a valueObject-et felnyomjuk az arraybe
            addRow(valueObject,tablebody)//lérehozzuk a sort és annak celláit az addrow függvény segítségével
        }
    })
    container.appendChild(formDiv);//hozzáadjuk a formot a containerhez
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------- a filter formja
/**
 * a rendező/szűrő form létrehozása(gomb, select, stb.)
 * a rendezés elvégzése
 * @param {HTMLDivElement} container a container element amelyhez hozzárendeljük a formot 
 * @param {HTMLTableSectionElement} tablebody a tablebody amelhyez a rendezés során hozzáadjuk a sorokat és cellákat
 * @param {Array} personArray a tömb amelyet lemásolunk hogy dolgozhassunk vele
 */
const createFilterForm = (container, tablebody, personArray ) => {
    const filterFormDiv = makeDiv('filterForm')//létrehozunk egy divet amely a filterForm osztály nevet kapja meg a makeDiv függvény segítségével
    container.appendChild(filterFormDiv);//a divet hozzáadom a container divhez

    const formForFilter = document.createElement('form');//létrehozunk egy formot
    filterFormDiv.appendChild(formForFilter);//a formot hozzáadjuk a filter divhez
    const select = document.createElement('select');//létrehozunk egy selectet
    formForFilter.appendChild(select);//a létrehozott selectet hozzadjuk a formhoz
    const options = //létrehozzuk egy tömböt amely tartalmazza a szűrés opciókat
    [{value: '',innerText: ''},//alap érték || semmi által szürünk
    {value: 'mufaj',innerText: 'műfaj'},//évszám szerint szűrünk
    {value: 'name',innerText: 'szerző'}]//az irányítószám szerint szűrűnk
    for(const option of options){//végig megyünk a tömbön mely tartalmazza az opciókat
        const optionElement = document.createElement('option');//létrehozunk egy option elementet
        optionElement.value = option.value;//az option element értéke megkapja az elem értékét
        optionElement.innerText = option.innerText//a opion element tartalmát feltöltjük az elem text értékével
        select.appendChild(optionElement);//a selecthez hozzá appendeljük az optionElementet
    }

    const button = document.createElement('button');//létrehozunk egy gombot
    button.innerText = 'Szures';//tartalmát feltöltjük egy string értékkel
    formForFilter.appendChild(button);//a gombot hozzáadjuk a formhoz
    formForFilter.addEventListener('submit', (e) => {
        e.preventDefault();//megakadályozza hogy az esemény frissítse a weboldalt
        const select = e.target.querySelector('select');//kiválasztjuk az összes szűrő elementet

        let rendezettArray = [];//a rendezett adatok tárolásáért felelős tömb

        if (select.value === 'name') {//ha a selectnél a szerzőt választottuk ki akkor aszerint sorba rendezi(betűrend)
            const tempArray = [...personArray];//az eredeti tömb másolata
            while (tempArray.length > 0) {//amíg marad elem a másolatban
                let legkisebbIndex = 0;//lekisebb index amely az 1. elemel kezd
                for (let i = 1; i < tempArray.length; i++) {//végig iterálunk a másolaton
                    if (tempArray[i].name < tempArray[legkisebbIndex].name) {//ha az indexelt szerző neve kisebb mint a legkisebbIndexelt szerző indexe
                        legkisebbIndex = i;//akkor frissíti a legkisebbIndex-et
                    }
                }
                rendezettArray.push(tempArray[legkisebbIndex]);//hozzáadjuk a rendezett tömbhöz
                tempArray.splice(legkisebbIndex, 1);// eltávolítjuk a kiválasztott elemet a másolatból
            }
        } else if (select.value === 'mufaj') {//ha a selectnél a műfajt választottuk ki akkor aszerint sorba rendezi(betűrend)
            // rendezés cím szerint betűrendben
            const tempArray = [...personArray];//az eredeti tömb másolata
            while (tempArray.length > 0) {//amíg marad elem a másolatban
                let legkisebbIndex = 0;//lekisebb index amely az 1. elemel kezd
                for (let i = 1; i < tempArray.length; i++) {//végig iterálunk a másolaton
                    if (tempArray[i].mufaj < tempArray[legkisebbIndex].mufaj) {//ha az indexelt szerző neve kisebb mint a legkisebbIndexelt szerző indexe
                        legkisebbIndex = i;//akkor frissíti a legkisebbIndex-et
                    }
                }
                rendezettArray.push(tempArray[legkisebbIndex]);//hozzáadjuk a rendezett tömbhöz
                tempArray.splice(legkisebbIndex, 1);// eltávolítjuk a kiválasztott elemet a másolatból
            }
        } else {//ha nincs semmi akkor visszatér az eredeti rendezetlen tömbre
            rendezettArray = [...personArray];//a rendezett tömb megkapja az alap tömb értékeit
        }
        tablebody.innerHTML = '';//kiürítjük a táblázat tőrzsét
        for (const elem of rendezettArray) {//végig iterálunk a rendezett tömbön
            addRow(elem,tablebody);//létrehozzuk a sort és annak celláit és ki is iratjuk
        }
    });
}