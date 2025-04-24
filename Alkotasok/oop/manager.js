/**
  * Az osztály fele a személyek kezeléséről
  * Egyben tárolja személyeket és végez callback függvényeket meghívás esetén
  */
class Manager{
    #array;//privát tulajdonság/property
    #addWorkCallback;//privát tulajdonság/property

    /**
     * a konstruktor eltárolja a jövőbeli személyeket
     */
    constructor(){
        this.#array = []//a személyek tárolására szánt tömb
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
     * @param {Work} person a személy amely Work osztályú típusu|| a paraméter amelyt hozzáadjuk a tömbhöz és táblázothoz
     */
    addPerson(person){
        this.#array.push(person);//hozzáaddja a személyt a tömbhöz
        this.#addWorkCallback(person);//meghívja a callbacket a person paraméterrel
    }
}