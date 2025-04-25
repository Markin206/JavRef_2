//------------------------------------------------------------------------------------------------------------------------------------------------------------- Különböző függvények és egyéb tartozékok a függvényekhez
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
const containerDiv = makeDiv('container');//a containerDiv változóban létrehozzuk a containert a makeDiv függvénnyel
document.body.appendChild(containerDiv);//a containerDiv változót hozzáadjuk a body-hoz

//------------------------------------------------------------------------------------------------------------------------------------------------------------- Letöltés gomb
const exportButton = document.createElement('button');//létrehozzunk egy gombot
exportButton.textContent = 'Letöltés';//gomb tartalmát feltöltjük egy string értékkel
containerDiv.appendChild(exportButton);//a gombot hozzáadjuk a containerhez
exportButton.addEventListener('click', () => {//a gombnak click eseményt figyelő addevenlistener
    const link = document.createElement('a');//létrehozunk egy anchort
    const contentArray = ['szerző;műfaj;cím']//létrehozzunk egy tömböt amely a file legfelső sorát tartalmazza
    for(const pers of array){//végig iterálunk a töm elemein
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

//------------------------------------------------------------------------------------------------------------------------------------------------------------- FELTÖLTÉS
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
                mufaj: fields[1],//a birth megkapja a feldarabolt sor 2. elemét
                cim: fields[2]//a zipcode megkapja a feldarabolt sor 3. elemét
            }
            array.push(pers);//felnyomjuk a tömbe az objektumunkat
            const tableBodyRow = document.createElement('tr');//létrehoztunk egy sort
            tbody.appendChild(tableBodyRow);//a sort hozzáadjuk a tbodyhoz
            
            const nameCell = document.createElement('td');//létrehozzuk a cellát
            nameCell.textContent = pers.name;//a cella tartalma megkapja az objektum name property-jét
            tableBodyRow.appendChild(nameCell);//a cella hozzáadjuk a sorhoz
        
            const birthCell = document.createElement('td');//létrehozzuk a cellát
            birthCell.textContent = pers.mufaj;//a cella tartalma megkapja az objektum birth property-jét
            tableBodyRow.appendChild(birthCell);//a cella hozzáadjuk a sorhoz
        
            const zipCodeCell = document.createElement('td');//létrehozzuk a cellát
            zipCodeCell.textContent = pers.cim;//a cella tartalma megkapja az objektum zipcode property-jét
            tableBodyRow.appendChild(zipCodeCell);//a cella hozzáadjuk a sorhoz
        }
    }
    fileReader.readAsText(file);//beolvasuk a szöveges fájlunkat
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------- TABLE
const tableDiv = makeDiv('table');//a tableDiv változóban létrehozzuk a table-t a makeDiv függvénnyel
const tableSim = document.createElement('table');//létrehozunk egy táblázatott
tableDiv.appendChild(tableSim);//hozzáadjuk a table osztályú divhez a táblázatott
const tableHead = document.createElement('thead');//létrehozzuk a fejlécet a táblázattnak
tableSim.appendChild(tableHead);//a fejlécet hozzáadjuk táblázathoz
const tableHeadRow =  document.createElement('tr');//létrehozzuk a fejléc sorát
tableHead.appendChild(tableHeadRow)//a fejléc sorát hozzáadjuk a fejléchez
const theadList = ['szerző', 'műfaj', 'cím'];//létrehozzunk egy string típusú tömböt amely tartalmazza 'szerző', 'műfaj', 'cím' értéket amely a táblázat fejléce lesz
for(const cellContent of theadList){// a tömbön végigiterálunk cellContent néven
    const thcell = document.createElement('th');//létrehozzuk a fejlécnek cella elemét
    thcell.innerText = cellContent;//a cella belső értéket a tömb egyik eleme lesz
    tableHeadRow.appendChild(thcell);//a cellát hozzáadjuk a fejléc sorához
}
const tbody = document.createElement('tbody');//létrehozzuk a táblázat tőrzsét
tableSim.appendChild(tbody);//hozzáadjuk a táblázathoz a táblázat tőrzsét

containerDiv.appendChild(tableDiv);//a tableDiv változó amely tartalmazza a table osztályú div-et hozzá adjuk a containerDiv-hez

//------------------------------------------------------------------------------------------------------------------------------------------------------------- FORM létrehozása
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
    e.preventDefault();//megoldja hogy a weboldal betöltésénél ne történjen meg az esemény
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
    array.push(valueObject);//a valueObject-et felnyomjuk az arraybe
    const tableBodyRow = document.createElement('tr');//létrehozzuk a táblázat tőrzsének sorát
    tbody.appendChild(tableBodyRow);//hozzáadjuk a tbodyhoz a sort
    
    const nameCell = document.createElement('td');//létrehozzuk azt a cellát amely tartalmazni fogja a neveket
    nameCell.textContent = valueObject.name;//a cellát feltöltjük a valueObject "name" tulajdonság értékével
    tableBodyRow.appendChild(nameCell);//a cellát hozzáadjuk a sorhoz

    const birthCell = document.createElement('td');//létrehozzuk azt a cellát amely tartalmazni fogja a születés éveket
    birthCell.textContent = valueObject.mufaj;//a cellát feltöltjük a valueObject "birth" tulajdonság értékével
    tableBodyRow.appendChild(birthCell);//a cellát hozzáadjuk a sorhoz

    const zipCodeCell = document.createElement('td');//létrehozzuk azt a cellát amely tartalmazni fogja az irányítószámokat
    zipCodeCell.textContent = valueObject.cim;//a cellát feltöltjük a valueObject "zipcode" tulajdonság értékével
    tableBodyRow.appendChild(zipCodeCell);//a cellát hozzáadjuk a sorhoz
    }
})

containerDiv.appendChild(formDiv);//a formDiv változó amely tartalmazza a div osztályú div-et hozzá adjuk a containerDiv-hez

