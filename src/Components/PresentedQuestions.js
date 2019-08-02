import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import PresentedAnswers from './PresentedAnswers'
import {Collapse} from 'antd';

const {Panel} = Collapse;

class PresentedQuestions extends Component {
    render() {
        console.log(this.props.questions.inputtedQuestions);
        const presentedQuestions = this.props.questions.inputtedQuestions.map((questionItem, index) => (
            <div>
                <Collapse>
                    <Panel header={`${questionItem.title} at ${questionItem.playedTime.toFixed(2)}s`} key={index}>
                        <PresentedAnswers data={questionItem.answerData}/>
                    </Panel>
                </Collapse>
            </div>
        ));
        return (
            <div>
                <h3>Created questions:</h3>
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

export default connect(mapStateToProps, null)(PresentedQuestions);