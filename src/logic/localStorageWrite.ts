import { StoredData } from "../types/types";

const localStorageWrite = (array: StoredData[], name: string) => {

    if (array.length && name) {
        const stringified = JSON.stringify(array);
        localStorage.setItem(name, stringified);
    } else if (array && name) {
        localStorage.setItem(name, "[]");
    }

}

export default localStorageWrite;