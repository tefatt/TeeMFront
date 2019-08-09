import React, {Component} from 'react';
import {Modal, Icon, Input, InputNumber, Form} from 'antd';


const EditForm = Form.create()(
    (props) => {
        const {text, time, form} = props;

        const {getFieldDecorator} = form;
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
        return (
            <Form {...formItemLayout}>
                <Form.Item>
                    {getFieldDecorator(`editedText`, {
                        initialValue: text,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "The question can't be blank",
                            },
                        ],
                    })(
                        <Input size="large" style={{width: '60%', marginRight: 8}}/>
                    )}
                </Form.Item>
                {!!time && <Form.Item>
                    {getFieldDecorator(`editedTime`, {
                        initialValue: time,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                message: "The question time can't be blank",
                            },
                        ],
                    })(
                        <InputNumber min={0} step={0.01}/>
                    )}
                </Form.Item>}
            </Form>
        )
    })

class EditModal extends Component {
    state = {visible: false};

    saveFormRef = (form) => {
        this.form = form;
    };

    showModal = () => {
        this.setState({visible: true});

    };

    handleCancel = e => {
        this.setState({visible: false});
    };

    handleEdit = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

        this.props.handleSubmit(values);
        form.resetFields();
        this.setState({visible: false});
        });
    };

    render() {
        return (
            <a>
                <Icon type="edit" onClick={this.showModal} theme="twoTone"/>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleEdit}
                    onCancel={this.handleCancel}>
                    <EditForm ref={this.saveFormRef}
                              text={this.props.text}
                              time={this.props.time}
                    />
                </Modal>
            </a>
        );
    }
}

export default EditModal;