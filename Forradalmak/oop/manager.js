/**
 * Az osztály fele a személyek kezeléséről
 * Egyben tárolja személyeket és végez callback függvényeket meghívás esetén
 * és mostantól tartalmazza a fájl exportáláshoz való tárolást
 */
class Manager{
    #array;//privát tulajdonság/property
    #addPersonCallback;//privát tulajdonság/property

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
    setAddPersonCallback(callback){
        this.#addPersonCallback = callback;//callback függvény beállítása
    }

    /**
     * 
     * @param {Person} person 
     */
    addPerson(person){
        this.#array.push(person);//hozzáaddja a személyt a tömbhöz
        this.#addPersonCallback(person);//meghívja a callbacket a person paraméterrel
    }

    generateExportString(){
        const result = ['name;birth;zipcode']
        for(const person of this.#array){
            result.push(`${person.name};${person.birth};${person.zipcode}`);
        }
        return result.join('\n');
    }
}