const inputValueParse = (inputValue: string) => {
    if (inputValue) {
        return JSON.parse(inputValue);
    }
    return null;
}

export default inputValueParse;