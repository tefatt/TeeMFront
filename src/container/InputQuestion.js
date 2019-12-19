import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Button, Modal, Form, Checkbox, Input, Row, Col, Icon} from 'antd';
import {bindActionCreators} from 'redux'

import {connect} from 'react-redux';
import {inputQuestion} from '../actions/questionActions';


const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const {visible, playedTime, onCancel, onCreate, add, remove, form} = props;

        const {getFieldDecorator, getFieldValue} = form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 20, offset: 4},
            },
        };
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => (
            <Row>
                <Col>
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Answers' : ''}
                        required={true}
                        key={k}
                    >
                        {getFieldDecorator(`answers[${k}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Please input the text of answer or delete this field.",
                                },
                            ],
                        })(<Input placeholder="Enter your answer here" style={{width: '60%', marginRight: 8}}/>)
                        }
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                onClick={() => remove(k)}
                            />
                        ) : null}
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        {getFieldDecorator(`isCorrect[${k}]`, {})(<Checkbox>Correct Answer</Checkbox>)}
                    </Form.Item>
                </Col>
            </Row>
        ));
        const questionTitle = `Create a new question at: ${playedTime.toFixed(2)}s`;
        return (
            <Modal
                visible={visible}
                title={questionTitle}
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Question text">
                        {getFieldDecorator('questionText', {
                            rules: [{required: true, message: 'Please enter the text of question'}],
                        })(
                            <Input type="textarea"/>
                        )}

                    </FormItem>
                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={add} style={{width: '60%'}}>
                            <Icon type="plus"/> Add answer
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);

class InputQuestion extends Component {
    state = {
        visible: false,
        index: 0,
        playedTime: 0
    };

    _restructureValues(values) {
        let answers = values.answers.filter(el => el);
        return answers.map((value, i) => {
            return {"answerText": value, "isCorrect": !!values.isCorrect[i], "key": i}
        });
    }

    showModal = () => {
        let playedTime = this.props.getPlayerTime();
        this.setState({visible: true, playedTime});
    };
    handleCancel = () => {
        this.setState({visible: false, index: 0});
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values["answerData"] = this._restructureValues(values);
            values["playedTime"] = this.state.playedTime;

            const {["keys"]: _, ["answers"]: __, ["isCorrect"]: ___, ...questionData} = values;

            // dispatch action
            this.props.inputQuestion(questionData);
            form.resetFields();
            this.setState({visible: false, index: 0, playedTime: 0});
        });
    };

    saveFormRef = (form) => {
        this.form = form;
    };

    remove = k => {
        const form = this.form;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one answer
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const form = this.form;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(this.state.index++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    render() {
        return (
            <div style={{
                "alignItems": "flex-center",
                "paddingTop": "20px",
                "paddingLeft": "25px"
            }}>
                <Button type="primary" onClick={this.showModal}>Add Question</Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    playedTime={this.state.playedTime}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    index={this.state.index}
                    add={this.add}
                    remove={this.remove}
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    inputQuestion: (values) => {
        dispatch(inputQuestion(values));
    },
    // getPlayerTime: (questionIndex) => {
    //     dispatch(getPlayerTime(questionIndex));
    // },
});
export default connect(null, mapDispatchToProps)(InputQuestion);