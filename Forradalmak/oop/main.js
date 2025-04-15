const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator);
const fieldList = [//egy lista amely tartalmazza a field ID-ját és a tartalmát (nem lehet ugyanaz a neve mivel osztály)
    {fieldid: 'name',fieldLabel: 'név'},//név cella
    {fieldid: 'birth',fieldLabel: 'születési év'},//születési év cella
    {fieldid: 'zipcode',fieldLabel: 'irányítószám'}];//irányítószám cella

const table = new Table('table');//meghívjuk az osztály konstruktorát és megadjuk a table mint paramétert
const form = new Form('form', fieldList);//meghivjuk az osztályt és megadjuk a form string paramétert és fieldList Array tipusú paramétert