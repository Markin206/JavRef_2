const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator);//a separator-t hozzáadjuk a tőrzshöz
const fieldArrayList = [{//létrehozunk egy tömböt amely tartalmaz 2 tulajdonságot fieldid amely tartalmazza a field Id-jét és fieldLabel amely tartalmazza a szöveget
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
const manager = new Manager()//inicializáljuk a manager osztályt
const table = new Table('table', manager);//meghívjuk a Table osztályt és konstruktorával létrehozzuk a table osztályú div-et és létrehozzuk a táblázatott vele
const form = new Form('form',fieldArrayList, manager);//meghívjuk a Form osztályt és konstruktorával létrehozzuk a form osztályú div-et és a bele tartozó formot is a megadott tömb által