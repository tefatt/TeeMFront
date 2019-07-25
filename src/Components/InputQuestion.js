import React from 'react';
import 'antd/dist/antd.css';
import {Button, Modal, Form, Input, Icon} from 'antd';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const {visible, onCancel, onCreate, add, remove, form} = props;

        const { getFieldDecorator, getFieldValue } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Answers' : ''}
                required={false}
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
                })(<Input placeholder="Enter your answer here" style={{ width: '60%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <Modal
                visible={visible}
                title="Create a new question"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Question text">
                        {getFieldDecorator('question', {
                            rules: [{required: true, message: 'Please enter the text of question'}],
                        })(
                            <Input type="textarea"/>
                        )}
                    </FormItem>
                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add answer
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
        index: 0
    };
    showModal = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({visible: false, index:0});
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false, index:0});
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };

    remove = k => {
        const form = this.form;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
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
            <div>
                <Button type="primary" onClick={this.showModal}>Add Question</Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
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

export default CollectionsPage;