import { StoredData } from "../types/types";

const localStorageLoad = (array: StoredData[]) => {

    if (array.length) {
        const kept = localStorage.getItem("Words to Learn");

        if (kept) {
            const parsedKept = JSON.parse(kept);
            const united = [...parsedKept, ...array];

            const stringified = JSON.stringify(united);
            localStorage.setItem("Words to Learn", stringified);
        } else {
            localStorage.setItem("Words to Learn", JSON.stringify(array));
        }


    }
}

export default localStorageLoad;