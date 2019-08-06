export function inputQuestion(values) {
    return {
        type: "INPUT_QUESTION",
        payload: values
    };
}

export function editQuestion(editedQuestion) {
    const {index, ...question} = editedQuestion;
    return {
        type: "EDIT_QUESTION",
        payload: question,
        index: index
    };
}

export function deleteQuestion(questionIndex) {
    return {
        type: "DELETE_QUESTION",
        index: questionIndex
    };
}


export function editAnswer(questionIndex, editedAnswer) {
    const {key, ...answer} = editedAnswer;
    return {
        type: "EDIT_ANSWER",
        payload: answer,
        questionIndex,
        answerIndex:key
    };
}

export function deleteAnswer(questionIndex, answerIndex) {
    console.log(questionIndex);
    return {
        type: "DELETE_ANSWER",
        questionIndex,
        answerIndex
    };
}