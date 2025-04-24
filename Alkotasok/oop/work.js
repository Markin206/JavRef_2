/**
  * Osztály amely tartalmazza a személyek tulajdonságait
  */
class Work {
    #name;//privát tulajdonság/property
    #mufaj;//privát tulajdonság/property
    #cim;//privát tulajdonság/property

    get cim(){//getter függvény által eltárolja a tulajdonságot
        return this.#cim;//visszatér a #zipcode tulajdonsággal
    }

    get name(){//getter függvény által eltárolja a tulajdonságot
        return this.#name;//visszatér a #name tulajdonsággal
    }

    get mufaj(){//getter függvény által eltárolja a tulajdonságot
        return this.#mufaj;//visszatér a #birth tulajdonsággal
    }

    /**
     * Beállítja a tulajdonságokat
     * @param {string} name az író neve
     * @param {string} mufaj a mű műfaja
     * @param {string} cim a mű címe
     */
    constructor(name, mufaj, cim){
        this.#name = name;//beállítja a nevet
        this.#mufaj = mufaj;//beállítja a születés évet
        this.#cim = cim;//beállítja a irányítószámot
    }
}