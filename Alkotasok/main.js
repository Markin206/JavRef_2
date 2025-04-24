
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

const formDiv = makeDiv('form');//a formDiv változóban létrehozzuk a div-et a makeDiv függvénnyel

containerDiv.appendChild(tableDiv);//a tableDiv változó amely tartalmazza a table osztályú div-et hozzá adjuk a containerDiv-hez
containerDiv.appendChild(formDiv);//a formDiv változó amely tartalmazza a div osztályú div-et hozzá adjuk a containerDiv-hez