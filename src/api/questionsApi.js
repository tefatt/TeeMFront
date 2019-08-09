import {handleResponse, handleError} from "./apiUtils";
import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000/api/";

export function submitQuestions(questionData){
    return axios.post(baseUrl + 'exercise/', {
        questionData,
    })
        .then(handleResponse())
        .catch(handleError());
}