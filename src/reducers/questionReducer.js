const initialState = {
    inputtedQuestions: []
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INPUT_QUESTION":
            return {
                inputtedQuestions: [...state.inputtedQuestions, action.payload]
            };
        default:
            return state;
    }
};

export default questionReducer;