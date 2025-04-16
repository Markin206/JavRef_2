/**
 * Osztály amely tartalmazza a személyek tulajdonságait
 */
class Person {
    #name;//privát tulajdonság/property
    #birth;//privát tulajdonság/property
    #zipcode;//privát tulajdonság/property

    get zipcode(){//getter függvény által elérhetővé teszi a tulajdonságot
        return this.#zipcode;//visszatér a #zipcode tulajdonsággal
    }

    get name(){//getter függvény által elérhetővé teszi a tulajdonságot
        return this.#name;//visszatér a #name tulajdonsággal
    }

    get birth(){//getter függvény által elérhetővé teszi a tulajdonságot
        return this.#birth;//visszatér a #birth tulajdonsággal
    }

    /**
     * Beállítja a tulajdonságokat
     * @param {string} name a személy neve
     * @param {string} birth a személy születés éve
     * @param {string} zipcode a személy irányítószáma
     */
    constructor(name, birth, zipcode){
        this.#name = name;//beállítja a nevet
        this.#birth = birth;//beállítja a születés évet
        this.#zipcode = zipcode;//beállítja a irányítószámot
    }
}