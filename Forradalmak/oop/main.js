const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator);
const fieldList = [//egy lista amely tartalmazza a field ID-ját és a tartalmát (nem lehet ugyanaz a neve mivel osztály)
    {fieldid: 'revolution',fieldLabel: 'forradalom'},//név cella
    {fieldid: 'year',fieldLabel: 'evszam'},//születési év cella
    {fieldid: 'successful',fieldLabel: 'sikeres'}];//irányítószám cella

const manager = new Manager()//inicializáljuk a manager osztályt
const table = new Table('table', manager);//meghívjuk az osztály konstruktorát és megadjuk a table és managert mint paramétert
const form = new Form('form', fieldList,manager );//meghivjuk az osztályt és megadjuk a form string paramétert és fieldList Array tipusú paramétert
const fileUplad = new Upload('upload', manager);//meghívjuk az osztály konstruktorát és megadjuk a upload, és managert mint paramétert