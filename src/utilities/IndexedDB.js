import idb from 'idb'

export default class IndexedDB {
    
    constructor(db_name, key_val) {
        this.dbName = db_name;
        this.keyVal = key_val;
        this.dbPromise = idb.open(db_name, 1, upgradeDB => {
            upgradeDB.createObjectStore(key_val, {keyPath: 'id', autoIncrement: true});
        });
    }

    getAll() {
        return this.dbPromise.then(db => {
            return db.transaction(this.keyVal)
                .objectStore(this.keyVal)
                .getAll();
        })
    }
    get(key) {
        return this.dbPromise.then(db => {
            return db.transaction(this.keyVal)
                .objectStore(this.keyVal)
                .get(key);
        });
    }
    set(key, val) {
        return this.dbPromise.then(db => {
            const tx = db.transaction(this.keyVal, 'readwrite');
            tx.objectStore(this.keyVal).put(val, key);
            return tx.complete;
        })
    }
    delete(key) {
        return this.dbPromise.then(db => {
            const tx = db.transaction(this.keyVal, 'readwrite');
            tx.objectStore(this.keyVal).delete(key);
            return tx.complete;
        })
    }
    store(val) {
        return this.dbPromise.then(db => {
            const tx = db.transaction(this.keyVal, 'readwrite');
            tx.objectStore(this.keyVal)
                .put(val);
            return tx.complete;
        })
    }
}