const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator);//a separator-t hozzáadjuk a tőrzshöz
const table = new Table('table');//meghívjuk a Table osztályt és konstruktorával létrehozzuk a table osztályú div-et és létrehozzuk a táblázatott vele
const form = new Area('form');//meghívjuk a Area osztályt és konstruktorával létrehozzuk a form osztályú div-et