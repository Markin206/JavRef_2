/**
 * Leszármazott osztály az Area osztálynak
 * Feladata:
 * Kiszűrni a táblázatot
 * létrehozni az inputot, selectet, gombot
 * a leszűrt adatot eltárolni egy külön 
 */
class Filter extends Area {
    /**
     * A constructor létrehozza a formot, selectet, inputot, gombot, és leszűri a 
     * @param {string} cssclass 
     * @param {Object} manager 
     */
    constructor(cssclass, manager){
        super(cssclass, manager);//meghívjuk az Area konstruktorát
        const form = document.createElement('form');//létrehozzuk a formot
        this.div.appendChild(form);//a divhez hozzáadjuk a formot
        const select = document.createElement('select');//létrehozzuk a select-et
        form.appendChild(select);//a formhoz hozzáadjuk a selectet
        const options = [//létrehozunk egy üres tömböt amely tartalmazza a select opcióit
            {value: '',innerText: ''},//az üres opció amely esetén vissza áll az eredeti táblázat
            {value: 'birth',innerText: 'születési dátum'},//születés év értéket kapja meg az opció és tartalomként stringet kap
            {value: 'zipcode',innerText: 'irányítószám'}]//irányítószám értéket kapja meg az opció és tartalomként stringet kap
        for(const option of options){//végig iterálunk az options tömbön
            const optionElement = document.createElement('option');//létrehozunk egy option elementet
            optionElement.value = option.value;//értéknek megkapja a tömb element értékét
            optionElement.innerText = option.innerText//tartalma a tömb element értékét kapja meg
            select.appendChild(optionElement);//selecthez hozzáadjuk a létrehozott option element-et
        }
        
        const input =  document.createElement('input');//létrehozzuk az inputot
        input.id='filterInput';//az input id-ja filterInput lesz
        form.appendChild(input);//a formhoz hozzáadjuk az inputot
        
        const button = document.createElement('button');//létrehozzuk a gombot
        button.innerText = 'Szűrés';//gomb tartalma "Szűrés"
        form.appendChild(button);//hozzáadjuk a formhoz a gombot
        form.addEventListener('submit', (e) => {//a formban figyel submit eseményre az addeventlistener
            e.preventDefault();//megoldja hogy alapból ne fusson le az esemény a weboldal betöltése esemény
            const filterInput = e.target.querySelector('#filterInput');//kiválasztjuk a formban lévő elementeket amely a filterInput ID-t tartalmazza
            const select = e.target.querySelector('select');//kiválasztjuk az összes select osztályú elementet
            this.manager.filter((element) => {//a managerben lévő filter függvény által szűrünk az element paraméter által
                if(select.value == 'birth'){//ha név szerint szűrünk
                    if(Number(filterInput.value) === element.birth){//az input értékét Number típusra alakítom és megnézzik hogy biztosan megegyezik az element értékével és típusával
                        return true;//visszatér true-val
                    }
                }else if(select.value == 'zipcode'){//ha irányítószám szerint szűrünk
                    if(Number(filterInput.value) === Number(element.zipcode)){//az input és element értékét number típusra alakítom és megnézem hogy értékük és típusuk megegyezik-e?
                        return true;//visszatér true-val
                    }
                }else{
                    return true;//visszatér true-val
                }
            })
        })
    }
}