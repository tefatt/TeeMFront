const initialState = {
    inputtedQuestions: []
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INPUT_QUESTION":
            return {
                inputtedQuestions: [...state.inputtedQuestions, action.payload]
            };
        case "EDIT_QUESTION":
            return {
                inputtedQuestions: state.inputtedQuestions.map(item => {
                    if (item.index !== action.index) return item;
                    return {
                        ...item,
                        ...action.payload
                    }
                })
            };

        case "DELETE_QUESTION":
            return {
                inputtedQuestions: state.inputtedQuestions.filter(item => item.index !== action.index)
            };
        case "EDIT_ANSWER":
            return {
                inputtedQuestions: state.inputtedQuestions.map(qItem => {
                    if (qItem.index !== action.questionIndex) return qItem;
                    const editedAnswers = {
                        "answerData": qItem.answerData.map(aItem => {
                            if (aItem.key !== action.answerIndex) return aItem;
                            return {
                                ...aItem,
                                ...action.payload
                            }
                        })
                    };
                    return {
                        ...qItem,
                        ...editedAnswers
                    }
                })
            };
        case "DELETE_ANSWER":
            return {inputtedQuestions : state.inputtedQuestions.map((question) => {
                if (question.index !== action.questionIndex) return question;
                return {...question, answerData: question.answerData.filter((subElement) => subElement.key !== action.answerIndex)}
            })};

        case "LOAD_QUESTIONS_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};

export default questionReducer;