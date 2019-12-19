import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Table, Divider, Icon, Switch} from 'antd';
import EditModal from '../components/EditModal'
import {editAnswer, deleteAnswer} from '../actions/questionActions';


class PresentedAnswers extends Component {
    state = {
        columns: [
            {
                title: 'switch',
                dataIndex: 'isCorrect',
                key: 'isCorrect',
                width: 5,
                render: (e, record) => (<Switch onChange={switchValue => this.handleSwitchChange(record, switchValue)}
                                                 defaultChecked={e}/>)
            },
            {
                title: 'text',
                dataIndex: 'answerText',
                key: 'answerText',
                width: 500,
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                width: 5,
                render: (text, record) => (
                    <div onClick={e => e.stopPropagation()}>
                        <EditModal text={record.answerText} time={null}
                                   handleSubmit={this.editAnswer(record)}/>
                        <Divider type="vertical"/>
                        <Icon type="delete" theme="twoTone" onClick={() => this.deleteAnswer(record.key)}/>
                    </div>
                ),
            }
        ],
        bordered: true,
        loading: false,
        pagination: false,
        size: 'medium',
        showHeader: false,
        scroll: undefined
    };

    handleSwitchChange = (answerData, switchValue) => {
        answerData["isCorrect"] = switchValue;

        // dispatch action
        this.props.editAnswer(this.props.questionIndex, answerData);
    };

    editAnswer = answerData => value => {
        answerData["answerText"] = value.editedText;

        // dispatch action
        this.props.editAnswer(this.props.questionIndex, answerData);
    };

    deleteAnswer = index => {
        console.log(index);
        // dispatch action
        this.props.deleteAnswer(this.props.questionIndex, index);
    };

    render() {
        const {["columns"]: columns, ...state} = this.state;
        const answers = this.props.answers;
        return (
            <div>
                <Table {...state} columns={columns} dataSource={answers}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editAnswer: (questionIndex, editedAnswer) => {
            dispatch(editAnswer(questionIndex, editedAnswer));
        },
        deleteAnswer: (questionIndex, answerIndex) => {
            dispatch(deleteAnswer(questionIndex, answerIndex));
        }
    };
};

export default connect(null, mapDispatchToProps)(PresentedAnswers);