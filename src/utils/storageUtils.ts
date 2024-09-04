import { StorageType } from 'constants/storage.constant'

export { getStorageItem, setStorageItem, removeStorageItem }

function getStorageItem(storageType: StorageType, key: string) {
  if (!globalThis['window'] || !window[storageType]) return
  else {
    return window[storageType].getItem(key)
  }
}

function setStorageItem(storageType: StorageType, key: string, value: any) {
  if (!globalThis['window'] || !window[storageType]) return
  else {
    window[storageType].setItem(key, value)
  }
}

function removeStorageItem(storageType: StorageType, key: string) {
  if (!globalThis['window'] || !window[storageType]) return
  else {
    window[storageType].removeItem(key)
  }
}
