const array = [];//egy üres tömb amely késöbb tárolni fog táblázatok adatait
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
const containerDiv = makeDiv('container');//létrehozzuk a container osztályú divet a makeDiv függvényel
document.body.appendChild(containerDiv);//a létrehozott containert hozzáadjuk a testhez
const tableDiv = makeDiv('table');//létrehozzuk a table osztályú divet a makeDiv függvényel
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

//--------------------------------------------------------------------------------------------------------------------------------------
const formDiv = makeDiv('form');//létrehozunk egy divet amely a form osztályt tartalmazza a makeDiv függvény által

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
    const input = document.createElement('input');//létrehozzuk a field input elementjét
    input.id = fieldElement.fieldid;//az input id-ját megadjuk az elem fieldid tulajdonságával
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
    array.push(valueObject);//a valueObject-et felnyomjuk az arraybe
    const tableBodyRow = document.createElement('tr');//létrehozzuk a táblázat tőrzsének sorát
    tbody.appendChild(tableBodyRow);//hozzáadjuk a tbodyhoz a sort
    
    const nameCell = document.createElement('td');//létrehozzuk azt a cellát amely tartalmazni fogja a neveket
    nameCell.textContent = valueObject.name;//a cellát feltöltjük a valueObject "name" tulajdonság értékével
    tableBodyRow.appendChild(nameCell);//a cellát hozzáadjuk a sorhoz

    const birthCell = document.createElement('td');//létrehozzuk azt a cellát amely tartalmazni fogja a születés éveket
    birthCell.textContent = valueObject.birth;//a cellát feltöltjük a valueObject "birth" tulajdonság értékével
    tableBodyRow.appendChild(birthCell);//a cellát hozzáadjuk a sorhoz

    const zipCodeCell = document.createElement('td');//létrehozzuk azt a cellát amely tartalmazni fogja az irányítószámokat
    zipCodeCell.textContent = valueObject.zipcode;//a cellát feltöltjük a valueObject "zipcode" tulajdonság értékével
    tableBodyRow.appendChild(zipCodeCell);//a cellát hozzáadjuk a sorhoz
    }
})

//--------------------------------------------------------------------------------------------------------------------------------------
containerDiv.appendChild(tableDiv);//a tablaDiv-et hozzáadjuk a containerDivhez
containerDiv.appendChild(formDiv);//a formDiv-et hozzáadjuk a containerDivhez

//--------------------------------------------------------------------------------------------------------------------------------------
const fileInput = document.createElement('input')//létrehozunk egy inputot
containerDiv.appendChild(fileInput);//az inputot belerakjuk a container divbe
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
                birth: fields[1],//a birth megkapja a feldarabolt sor 2. elemét
                zipcode: fields[2]//a zipcode megkapja a feldarabolt sor 3. elemét
            }
            array.push(pers);//felnyomjuk a tömbe az objektumunkat
            const tableBodyRow = document.createElement('tr');//létrehoztunk egy sort
            tbody.appendChild(tableBodyRow);//a sort hozzáadjuk a tbodyhoz
            
            const nameCell = document.createElement('td');//létrehozzuk a cellát
            nameCell.textContent = pers.name;//a cella tartalma megkapja az objektum name property-jét
            tableBodyRow.appendChild(nameCell);//a cella hozzáadjuk a sorhoz
        
            const birthCell = document.createElement('td');//létrehozzuk a cellát
            birthCell.textContent = pers.birth;//a cella tartalma megkapja az objektum birth property-jét
            tableBodyRow.appendChild(birthCell);//a cella hozzáadjuk a sorhoz
        
            const zipCodeCell = document.createElement('td');//létrehozzuk a cellát
            zipCodeCell.textContent = pers.zipcode;//a cella tartalma megkapja az objektum zipcode property-jét
            tableBodyRow.appendChild(zipCodeCell);//a cella hozzáadjuk a sorhoz
        }
    }
    fileReader.readAsText(file);//beolvasuk a szöveges fájlunkat
})

//--------------------------------------------------------------------------------------------------------------------------------------
const exportButton = document.createElement('button');//létrehozunk egy gombot
exportButton.textContent = 'Letöltés';//a gomb tartalmát kitöltjük egy string értékkel
containerDiv.appendChild(exportButton);//a gombot hozzáadjuk a container divhez
exportButton.addEventListener('click', () => {//addeventlistener amely a click-et figyeli a gombnál
    const link = document.createElement('a');//létrehozunk egy anchor linket
    const contentArray = ['name;birth;zipcode']//létrehozunk egy tömböt amely tartalmaz string értékeket
    for(const pers of array){//végig iterálunk a tömbön amely tárolta a táblázat elemeit
        contentArray.push(`${pers.name};${pers.birth};${pers.zipcode}`);//a contentarray tömbe felpusholjuk a a táblázat elemeit
    }
    const content = contentArray.join('\n');//a tömbött sorvégenként kombináljuk egy string-é
    const file = new Blob([content])//eltároljuk az egységes stringet egy bloba mint nyers bináris adat
    link.href = URL.createObjectURL(file);//a link href property-je megkapja az újonnan létrehozott URL objektumot amely a fájlból készült
    link.download = 'newdata.csv'//letöltjük az új fájlt newdata.csv néven
    link.click();//linkek meghívjuk a beépített click függvényt
    URL.revokeObjectURL(link.href);//kiürítjük az URL-t
})

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

const filterFormDiv = makeDiv('filterForm')//létrehozunk egy divet amely a filterForm osztály nevet kapja meg a makeDiv függvény segítségével
containerDiv.appendChild(filterFormDiv);//a divet hozzáadom a container divhez

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

const input =  document.createElement('input');//létrehozunk egy inputot
input.id='filterInput';//annak id-ja lesz a filterInput
formForFilter.appendChild(input);//és hozzáadjuk a formhoz

const button = document.createElement('button');//létrehozunk egy gombot
button.innerText = 'Szures';//tartalmát feltöltjük egy string értékkel
formForFilter.appendChild(button);//a gombot hozzáadjuk a formhoz
formForFilter.addEventListener('submit', (e) => {//létrehozunk a form egy addEventListener-t amely a submit eseményt figyeli
    e.preventDefault();//ezáltal nem fut le az esemény önmagától a weboldal betöltésénél
    const filterInput = e.target.querySelector('#filterInput');//kiválasztjuk az összes inputot amely tartalmazza a #filterInput osztályt
    const select = e.target.querySelector('select');//kiválasztjuk a formon belüli select osztályú elementeket

    const filteredArray = filter(array, (element) => {//létrehozunk egy új tömböt amely az arrayt szűri az element paraméter alapjánt
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

    tbody.innerHTML = '';//nullázuk a tbody tartalmát
    for(const filteredElement of filteredArray){//végigjárunk a szűrő tömbön
        const tableBodyRow = document.createElement('tr');//létrehozunk egy sort
            tbody.appendChild(tableBodyRow);//a sort hozzáadjuk a tbodyhoz
            
            const nameCell = document.createElement('td');//létrehozzuk a cellát amely a nevet tartalmazza
            nameCell.textContent = filteredElement.name;//a cella megkapja az elem név értékét
            tableBodyRow.appendChild(nameCell);//a cellát a sorhoz hozzáadjuk
        
            const birthCell = document.createElement('td');//létrehozzuk a cellát amely a születésévet tartalmazza
            birthCell.textContent = filteredElement.birth;//a cella megkapja az elem születés év értékét
            tableBodyRow.appendChild(birthCell);//a cellát a sorhoz hozzáadjuk
        
            const zipCodeCell = document.createElement('td');//létrehozzuk a cellát amely a irányítószámot tartalmazza
            zipCodeCell.textContent = filteredElement.zipcode;//a cella megkapja az elem irányítószám értékét
            tableBodyRow.appendChild(zipCodeCell);//a cellát a sorhoz hozzáadjuk
    }
})