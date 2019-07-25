import React from 'react';
import 'antd/dist/antd.css';
import {Button, Modal, Form, Input} from 'antd';

import DynamicFieldSet from './InputAnswer'

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const {visible, onCancel, onCreate, form} = props;
        const {getFieldDecorator} = form;
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
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: 'Please enter the text of question'}],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    {/*<FormItem label="Description">*/}
                        {/*{getFieldDecorator('description')(<Input type="textarea"/>)}*/}
                    {/*</FormItem>*/}
                    {/*<FormItem className="collection-create-form_last-form-item">*/}
                        {/*{getFieldDecorator('modifier', {*/}
                            {/*initialValue: 'public',*/}
                        {/*})(*/}
                            {/*<Radio.Group>*/}
                                {/*<Radio value="public">Public</Radio>*/}
                                {/*<Radio value="private">Private</Radio>*/}
                            {/*</Radio.Group>*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                </Form>
                <DynamicFieldSet/>
            </Modal>
        );
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({visible: false});
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    };
    saveFormRef = (form) => {
        this.form = form;
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
                />
            </div>
        );
    }
}

export default CollectionsPage;