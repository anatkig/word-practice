const localStorageRead = (key: string) => {

    const rawData = localStorage.getItem(key);

    if (rawData) {
        return JSON.parse(rawData);
    }

    return [];
}


export default localStorageRead;