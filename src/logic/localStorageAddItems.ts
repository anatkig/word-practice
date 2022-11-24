import { StoredData } from "../types/types";

const localStorageAddItems = (storageName: string, item: StoredData) => {

    const storageRaw = localStorage.getItem(storageName);


    if (storageRaw) {
        const storage = JSON.parse(storageRaw);
        const changed = [...storage, item];
        localStorage.setItem(storageName, JSON.stringify(changed));
    } else {
        localStorage.setItem(storageName, JSON.stringify([item]));
    }

}

export default localStorageAddItems;