import React, {Component} from 'react';
import {Table, Divider} from 'antd';


class PresentedAnswers extends React.Component {

    state = {
        columns: [
            {
                dataIndex: 'answerText',
                key: 'answerText',
                width: 360,
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                width: 60,
                render: (text, record) => (
                                            <span>
                                              <a href="#">Edit</a>
                                              <Divider type="vertical"/>
                                              <a href="#">Delete</a>
                                            </span>
                ),
            }
        ],
        bordered: true,
        loading: false,
        pagination: false,
        size: 'medium',
        showHeader: false,
        rowSelection: {},
        scroll: undefined
    };

    render() {
        const {["columns"]: columns, ...state} = this.state;
        const data = this.props.data;

        state["rowSelection"] = {
            selectedRowKeys: data.map(answer => {
                if (answer.isCorrect) return answer.key
            }),

            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };

        return (
            <div>
                <Table {...state} columns={columns} dataSource={data}/>
            </div>
        );
    }
}

export default PresentedAnswers;