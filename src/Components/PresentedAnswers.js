import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Table, Divider, Icon, Switch} from 'antd';
import EditModal from './EditModal'
import {editAnswer, deleteAnswer} from '../actions/questionActions';


class PresentedAnswers extends Component {
    state = {
        columns: [
            {
                title: 'switch',
                dataIndex: 'isCorrect',
                key: 'isCorrect',
                width: 10,
                render: (e, record) => (<Switch onChange={switchValue => this.handleSwitchChange(record, switchValue)}
                                                 defaultChecked={e}/>)
            },
            {
                title: 'text',
                dataIndex: 'answerText',
                key: 'answerText',
                width: 360,
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                width: 10,
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

        // state["rowSelection"] = {
        //     selectedRowKeys: answers.map(answer => answer.isCorrect ? answer.key : null),
        //
        //     onSelect: (record, selected, selectedRows) => {
        //         console.log(record)
        //         console.log(selected)
        //         console.log(selectedRows)
        //         this.setState({rowSelection: new Set([...state["rowSelection"].selectedRowKeys.filter(Boolean), record.key])})
        //         console.log({rowSelection: new Set([...state["rowSelection"].selectedRowKeys.filter(Boolean), record.key])})
        //
        //     },
        //     getCheckboxProps: record => ({
        //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     }),
        // };
        // console.log(answers.map(answer => answer.isCorrect ? answer.key : null));
        // console.log(state["rowSelection"]);

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