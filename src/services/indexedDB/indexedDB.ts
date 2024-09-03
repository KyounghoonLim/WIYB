let _version: number
let _storeList: DOMStringList

function getDB(upgradeNeededHandler: (e: Event) => void, version?: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('WIYB', version)

    request.onerror = (err) => {
      console.log('❌ DB: failed to open database...')
      reject()
    }

    request.onsuccess = (e) => {
      const db = (e.target as IDBRequest).result as IDBDatabase
      _version = db.version
      _storeList = db.objectStoreNames
      resolve(db)
    }

    request.onupgradeneeded = upgradeNeededHandler
  })
}

export function deleteDB(dbName: string) {
  const req = indexedDB.deleteDatabase(dbName)
  req.onsuccess = function () {
    console.log('Deleted database successfully')
  }
  req.onerror = function () {
    console.log("Couldn't delete database")
  }
  req.onblocked = function () {
    console.log("Couldn't delete database due to the operation being blocked")
  }
}

function getDBVersion(): Promise<number> {
  return new Promise((resolve) => {
    if (_version) resolve(_version)
    else
      indexedDB.databases().then((dbs) => {
        const version = dbs.find((db) => db.name === 'WIYB')?.version
        _version = version || 0
        resolve(version)
      })
  })
}

export function getStore(storeName: string): Promise<IDBObjectStore> {
  return new Promise((resolve, reject) => {
    const upgradeNeededHandler = (e: Event) => {
      console.log(e)
      const db = (e.target as IDBOpenDBRequest).result
      db.createObjectStore(storeName, { autoIncrement: false })
    }

    // queue.addTask(async () => {
    // });
    getDBVersion()
      .then((version = 1) => {
        if (!_storeList) return version
        else {
          return _storeList?.contains(storeName) ? version : version + 1
        }
      })
      .then((version) => getDB(upgradeNeededHandler, version))
      .then((db) => {
        const ta = db.transaction(storeName, 'readwrite')
        const store = ta.objectStore(storeName)
        resolve(store)
      })
      .catch((err) => {
        console.error(err)
        /// pass ///
      })
  })
}

export function updateData<T = any>(storeName: string, key: string, value: T): Promise<T> {
  return new Promise(async (resolve, reject) => {
    getStore(storeName)
      .then((store) => {
        const r = store.put(value, key)
        r.onsuccess = (e) => {
          resolve((e.target as IDBRequest).result)
          store.transaction.db.close()
          // console.log('✅ DB: update data ' + key + ' is completed!');
        }
        r.onerror = () => {
          console.log('❌ DB: update data ' + key + ' is failed!')
          reject()
        }
      })
      .catch(reject)
  })
}

export function getData<T = any>(storeName: string, key: string): Promise<T> {
  return new Promise((resolve, reject) => {
    getStore(storeName)
      .then((store) => {
        const r = store.get(key)
        r.onsuccess = (e) => {
          const value = (e.target as IDBRequest).result
          resolve(value)
          store.transaction.db.close()
          // value
          //   ? console.log('✅ DB: get data ' + key + ' is completed!')
          //   : console.log('✅ DB: get data ' + key + ' is empty!');
        }
        r.onerror = () => {
          reject()
          console.log('❌ DB: get data ' + key + ' is failed!')
        }
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

export function deleteData(storeName: string, key: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    getStore(storeName)
      .then((store) => {
        const r = store.delete(key)
        r.onsuccess = (e) => {
          resolve((e.target as IDBRequest).result)
          store.transaction.db.close()
          // console.log('✅ DB: delete data ' + key + ' is completed!');
        }
        r.onerror = () => {
          reject()
          console.log('❌ DB: delete data ' + key + ' is failed!')
        }
      })
      .catch(reject)
  })
}

export default this
