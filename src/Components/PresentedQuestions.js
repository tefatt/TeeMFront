import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import PresentedAnswers from './PresentedAnswers'
import {editQuestion, deleteQuestion} from '../actions/questionActions';
import EditModal from './EditModal'

import {Collapse, Divider, Icon} from 'antd';

const {Panel} = Collapse;

class PresentedQuestions extends Component {

    state = {disabled: false};
    editQuestion = questionData => value => {
        // dispatch action
        questionData["title"] = value.editedText;
        questionData["playedTime"] = Number(value.editedTime);
        this.props.editQuestion(questionData);
    };

    deleteQuestion  = index => {
        // dispatch action
        this.props.deleteQuestion(index);
    };

    generateHeader = (questionItem) => (
        <span>
            <a> {questionItem.playedTime.toFixed(2)} </a>
            <a> s </a>
            <Divider type="vertical"/>
            <a> {questionItem.title} </a>
        </span>
    );
    generateExtra = (questionItem) => {
        return (<div onClick={e => e.stopPropagation()}>
            <EditModal text={questionItem.title} time={questionItem.playedTime.toFixed(2)} handleSubmit={this.editQuestion(questionItem)}/>
            <Divider type="vertical"/>
            <Icon type="delete" theme="twoTone" onClick={() => this.deleteQuestion(questionItem.index)}/>
        </div>)
    };

    render() {
        const itemsLength = this.props.questions.inputtedQuestions.length === 0;
        const presentedQuestions = this.props.questions.inputtedQuestions.map((questionItem, index) => (
            <div>
                <Collapse>
                    <Panel
                        key={questionItem.index}
                        header={this.generateHeader(questionItem)}
                        extra={this.generateExtra(questionItem)}
                    >
                        <PresentedAnswers answers={questionItem.answerData} questionIndex={questionItem.index}/>
                    </Panel>
                </Collapse>
            </div>
        ));
        return (
            <div>
                {!itemsLength && <h3>Created questions:</h3>}
                {presentedQuestions}
            </div>
        );
    }
}

PresentedQuestions.propTypes = {
    questions: PropTypes.object.isRequired
};

// const mapStateToProps = (state) => ({
//     questions: state.inputtedQuestions
// });

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editQuestion: (editedQuestion) => {
            dispatch(editQuestion(editedQuestion));
        },
        deleteQuestion: (questionIndex) => {
            dispatch(deleteQuestion(questionIndex));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PresentedQuestions);