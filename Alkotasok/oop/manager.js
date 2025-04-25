/**
  * Az osztály fele a személyek kezeléséről
  * Egyben tárolja személyeket és végez callback függvényeket meghívás esetén
  */
class Manager{
    /**
     * @type {{name: string, mufaj: string, cim: string}[]}
     */
    #array;//privát tulajdonság/property

    /**
     * @type {Function}
     */
    #addWorkCallback;//privát tulajdonság/property
    /**
     * @type {Function}
     */
    #renderTableCallback;//privát tulajdonság

    /**
     * a konstruktor eltárolja a jövőbeli személyeket
     */
    constructor(){
        this.#array = []//a személyek tárolására szánt tömb
    }

    /**
     * egy setter függvény amely arra szolgál hogy frissítse a táblázatott
     * @param {Function} callback a callback meghivásakor meghívott függvény
     */
    setRenderTableCallback(callback){
        this.#renderTableCallback = callback;
    }

    /**
     * callback amely arra szolgál hogy frissítse a táblázatott
     * @param {Function} callback a függvény amely a meghíváskor hívnak meg
     */
    setAddWorkCallback(callback){
        this.#addWorkCallback = callback;//callback függvény beállítása
    }

    /**
     * A person paramétert hozzáadjuk a tömbhöz amely tartalmazni fogja a hozzáadott személyeket
     * és callback által fríssiti a táblázatott
     * @param {{name: string, mufaj: string, cim: string}} person a személy amely Work osztályú típusu|| a paraméter amelyt hozzáadjuk a tömbhöz és táblázothoz
     */
    addPerson(person){
        this.#array.push(person);//hozzáaddja a személyt a tömbhöz
        this.#addWorkCallback(person);//meghívja a callbacket a person paraméterrel
    }

    /**
     * Az fájlnak létrehozz egy fejlécet és tartalmát feltölti
     * @returns {string} Az exportált fájl tartalma string-ben visszaadva
     */
    generateExportString(){
        const result = ['name;műfaj;cím']
        for(const person of this.#array){
            result.push(`${person.name};${person.mufaj};${person.cim}`);
        }
        return result.join('\n');
    }

    /**
     * A function feladata a táblázat sorbarendezése a selectek által és
     * frissíti a táblázatott
     * @param {HTMLSelectElement} select a select amelyt a felhasználó kiválasztott hogy aszerint rendezzük
     */
    sort(select){
        let rendezettArray = [];//a rendezett adatok tárolásáért felelős tömb

        if (select.value === 'name') {//ha a selectnél a szerzőt választottuk ki akkor aszerint sorba rendezi(betűrend)
            const tempArray = [...this.#array];//az eredeti tömb másolata
            while (tempArray.length > 0) {//amíg marad elem a másolatban
                let legkisebbIndex = 0;//lekisebb index amely az 1. elemel kezd
                for (let i = 1; i < tempArray.length; i++) {//végig iterálunk a másolaton
                    if (tempArray[i].name < tempArray[legkisebbIndex].name) {//ha az indexelt szerző neve kisebb mint a legkisebbIndexelt szerző indexe
                        legkisebbIndex = i;//akkor frissíti a legkisebbIndex-et
                    }
                }
                rendezettArray.push(tempArray[legkisebbIndex]);//hozzáadjuk a rendezett tömbhöz
                tempArray.splice(legkisebbIndex, 1);// eltávolítjuk a kiválasztott elemet a másolatból
            }
        } else if (select.value === 'mufaj') {//ha a selectnél a műfajt választottuk ki akkor aszerint sorba rendezi(betűrend)
            // rendezés cím szerint betűrendben
            const tempArray = [...this.#array];//az eredeti tömb másolata
            while (tempArray.length > 0) {//amíg marad elem a másolatban
                let legkisebbIndex = 0;//lekisebb index amely az 1. elemel kezd
                for (let i = 1; i < tempArray.length; i++) {//végig iterálunk a másolaton
                    if (tempArray[i].mufaj < tempArray[legkisebbIndex].mufaj) {//ha az indexelt szerző neve kisebb mint a legkisebbIndexelt szerző indexe
                        legkisebbIndex = i;//akkor frissíti a legkisebbIndex-et
                    }
                }
                rendezettArray.push(tempArray[legkisebbIndex]);//hozzáadjuk a rendezett tömbhöz
                tempArray.splice(legkisebbIndex, 1);// eltávolítjuk a kiválasztott elemet a másolatból
            }
        } else {//ha nincs semmi akkor visszatér az eredeti rendezetlen tömbre
            rendezettArray = [...this.#array];//a rendezett tömb megkapja az alap tömb értékeit
        }
        this.#renderTableCallback(rendezettArray);//meghívjuk a callbacket hogy frissítsük a táblázatott
    }
}