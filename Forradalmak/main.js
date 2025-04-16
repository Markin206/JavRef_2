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
    for(const inputField of inputFields){//végig iterálunk az inputFields-en
        
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
    }}

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