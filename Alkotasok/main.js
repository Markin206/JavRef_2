//------------------------------------------------------------------------------------------------------------------------------------------------------------- Különböző függvények

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

//------------------------------------------------------------------------------------------------------------------------------------------------------------- TABLE

const containerDiv = makeDiv('container');//a containerDiv változóban létrehozzuk a containert a makeDiv függvénnyel
document.body.appendChild(containerDiv);//a containerDiv változót hozzáadjuk a body-hoz
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

//------------------------------------------------------------------------------------------------------------------------------------------------------------- FORM


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
}

const buttonFormSim = document.createElement('button');//létrehozzuk a gomb elementet
buttonFormSim.textContent = 'hozzáadás';//a gomb belső szövegét feltöltjük
formSim.appendChild(buttonFormSim)//a gombot hozzáadjuk a fromhoz

containerDiv.appendChild(formDiv);//a formDiv változó amely tartalmazza a div osztályú div-et hozzá adjuk a containerDiv-hez