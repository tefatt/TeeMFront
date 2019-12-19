import {submitQuestions} from '../api/questionsApi'
import axios from 'axios'

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
        answerIndex: key
    };
}

export function deleteAnswer(questionIndex, answerIndex) {
    return {
        type: "DELETE_ANSWER",
        questionIndex,
        answerIndex
    };
}


export function saveQuestionsSuccess(payload) {
    return {type: "LOAD_QUESTIONS_SUCCESS", payload}
};

export function saveQuestions(videoId){
        return function(dispatch, getState) {
            const payload = {...getState().questions, videoId};
            console.log(payload);
        return submitQuestions(payload)
            .then(response => {
                dispatch(saveQuestionsSuccess(response.json));
            })
            .catch(error => {
                window.alert(error);
                throw error;
            })
    }
}
