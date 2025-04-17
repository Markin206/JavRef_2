/**
 * Az osztály fele a személyek kezeléséről
 * Egyben tárolja személyeket és végez callback függvényeket meghívás esetén
 * és mostantól tartalmazza a fájl exportáláshoz való tárolást
 */
class Manager{
    #array;//privát változó
    #addPersonCallback;//privát változó
    #renderTableCallback;//privát változó

    /**
     * a konstruktor eltárolja a jövőbeli személyeket
     */
    constructor(){
        this.#array = []//a személyek tárolására szánt tömb
    }

    /**
     * callback amely arra szolgál hogy berendelje a táblázaott
     * @param {(data: Person[]) => void} callback a függvény amely a rendeli a táblázatott de nem add vissza semmit.
     */
    setRenderTableCallback(callback){
        this.#renderTableCallback = callback;//callback függvény beállítása
    }

    /**
     * callback amely arra szolgál hogy frissítse a táblázatott
     * @param {Function} callback a függvény amely a meghíváskor hívnak meg
     */
    setAddPersonCallback(callback){
        this.#addPersonCallback = callback;//callback függvény beállítása
    }

    /**
     * Az újperson hozzáadása az array tömbbe
     * @param {Person} person 
     */
    addPerson(person){
        this.#array.push(person);//hozzáaddja a személyt a tömbhöz
        this.#addPersonCallback(person);//meghívja a callbacket a person paraméterrel
    }

    /**
     * A függvény azért felel hogy a megadott tömböl kiszürjük az adatokat a callback segítségével és eltároljuk egy t9mbe
     * @param {Function(Person): boolean} callback a callback függvény amely megnézi hogy az elem berakható a result tömbe vagy sem
     */
    filter(callback){
        const result = []//létrehozunk egy üres tömbön amely majd tartalmazni fogja a szűrt adatokat
        for(const person of this.#array){//végig iterálunk a tömbünkön
            if(callback(person)){//megnézzük a callback-el hogy be vagy sem rakhatjuk a result tömbbe
                result.push(person)//felpusholjuk a szürt személyt a result tömbbe
            }
        }
        this.#renderTableCallback(result);//meghívjuk a callback függvényt result tömb alapján amely által kiiratjuk a táblázatott
    }

    generateExportString(){
        const result = ['name;birth;zipcode']//a fejlécet egy tömbe eltároljuk
        for(const person of this.#array){//végig iterálunk a tömbön
            result.push(`${person.name};${person.birth};${person.zipcode}`);//a tömb elemeit felpusholjuk a tömbbe
        }
        return result.join('\n');//visszatérítjük az egybe rakott nyers bináris adatú tömbött
    }
}