const array = [];//egy üres tömb amely késöbb tárolni fog táblázatok adatait
const containerDiv = makeDiv('container');//létrehozzuk a container osztályú divet a makeDiv függvényel
document.body.appendChild(containerDiv);//a létrehozott containert hozzáadjuk a testhez
createTable(containerDiv, (bodyOfTable) => {//meghívjuk mint callback függvényt
    createForm(bodyOfTable, containerDiv, array);//meghívjuk a createForm függvényt a bodyofTable, containerDiv, array paraméterek alaján
    createFileUpload(bodyOfTable, containerDiv, array);//meghívjuk a createFileUpload függvényt a bodyofTable, containerDiv, array paraméterek alaján
    createFileDownload(containerDiv, array);//meghívjuk a createFilterForm függvényt a containerDiv, array paraméterek alaján
    createFilterForm(containerDiv, bodyOfTable, array)//meghívjuk a createFilterForm függvényt a bodyofTable, containerDiv, array paraméterek alaján
})