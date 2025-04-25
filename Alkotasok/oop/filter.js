/**
 * A sorba rendezés feladatát végzi el a manager osztály segítségével
 * A Filter osztály az Area leszármazott osztálya
 */
class Filter extends Area {
    /**
     * a filter osztály konstruktora ahol létrehozzuk a rendezés/szűrés gombját
     * és meghívjuk a sort függvényt a manager osztályból amely által rendezzük a táblázatott
     * @param {string} cssclass ezzel a paraméterrel hozzuk létre a divet az area osztály konstruktorával
     * @param {{sort: (select: HTMLSelectElement) => void}}} manager a manager objektum amely a callback elérhetőségét okoza
     */
    constructor(cssclass, manager){
        super(cssclass, manager);//meghívjuk az Area osztály konstruktorát (létrehozza a divet)
        const form = document.createElement('form');//létrehozzuk a form-ot
        this.div.appendChild(form);//a létrehozott divhez hozzáadjuk a formot
        const select = document.createElement('select');//select element létrehozása
        form.appendChild(select);//a selectet hozzáadom a formhoz
        
        const options = [//létrehozzunk egy tömböt amely a select opcióit tartalmazza
            { value: '', innerText: '' },//az üres opció
            { value: 'name', innerText: 'Szerző' },//a szerző opció amely értéke a name
            { value: 'mufaj', innerText: 'Műfaj' }//a Műfaj opció amely értéke mufaj
        ];
        for (const option of options) {//végig iterálunk a tömbön
            const optionElement = document.createElement('option');//létrehozzuk az opciót
            optionElement.value = option.value;//az opció megkapja az elem értékét
            optionElement.innerText = option.innerText;//az opció tartalmát feltöltjük az elem tartalmával
            select.appendChild(optionElement);//az opciókat hozzáadjuk a select elementhez
        }

        const button = document.createElement('button');//létrehozzuk a gombot
        button.innerText = 'Sorbarendezés';//tartalmát feltöltjük egy string értékkel
        form.appendChild(button);//a gombot hozzárendeljük a formhoz
        
        form.addEventListener('submit', (e) => {//a formban figyeli a submit eseményt
            e.preventDefault();//megoldja hogy esemény megtörténése által ne frissüljön a weboldal
            const select = e.target.querySelector('select');//kiválasztjük az összes select-et
            this.manager.sort(select);//meghívjuk a managerben lévő sort functiont amely a select-ek szerint rendez
        });
    }
}