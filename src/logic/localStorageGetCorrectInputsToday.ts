const localStorageGetCorrectInputsToday = () => {
    const correctInputsRaw = localStorage.getItem("correctInputsToday");

    const parsedInputs = correctInputsRaw && JSON.parse(correctInputsRaw);

    if (parsedInputs) {
        return Number(parsedInputs)
    } else {
        return 0;
    }
}


export default localStorageGetCorrectInputsToday;