import { StoredData } from "../types/types";

const createRandomWordAndAswer = (array: StoredData[]) => {

    const randomIndex = Math.floor(Math.random() * array.length);

    const word = array[randomIndex].ru;
    const correctAnswer = array[randomIndex].gu;

    return [word, correctAnswer, randomIndex];

}

export default createRandomWordAndAswer;