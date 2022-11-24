const localStorageRemoveItems = (number: number, name: string) => {

    const toLearnRaw = localStorage.getItem(name);


    if (toLearnRaw) {
        const toLearn = JSON.parse(toLearnRaw);
        if (toLearn.length > number) {
            const changed = toLearn.slice(number, toLearn.length);
            localStorage.setItem(name, JSON.stringify(changed));
        } else {
            localStorage.removeItem(name);
        }
    }

}

export default localStorageRemoveItems;