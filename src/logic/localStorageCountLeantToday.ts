const localStorageCountLearntToday = () => {

    const currentDate = new Date().getDate();
    const learntUnit = localStorage.getItem("learnt-today");
    if (learntUnit) {

        const parsedUnit = JSON.parse(learntUnit);

        const storedDate = parsedUnit[0];
        const storedCount = parsedUnit[1];

        if (storedDate === currentDate) {
            const newLearnUnit = [storedDate, storedCount + 1];
            localStorage.setItem("learnt-today", JSON.stringify(newLearnUnit));
        } else {
            const newLearnUnit = [currentDate, 1];
            localStorage.setItem("learnt-today", JSON.stringify(newLearnUnit));
        }
    } else {
        const newLearnUnit = [currentDate, 1];
        localStorage.setItem("learnt-today", JSON.stringify(newLearnUnit));
    }


}

export default localStorageCountLearntToday;