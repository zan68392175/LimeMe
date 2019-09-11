
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, Input } from 'antd';
import styles from './index.scss';

class AddMask extends Component {
  state = { visible: false };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal.bind(this)}>
          新增
        </Button>
        <Modal
          title="新增用户"
          visible={this.state.visible}
          onOk={this.handleSubmit.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          okText="确定"
          cancelText="取消"
        >
          <Form className={styles.login_form}>
            <Form.Item label="用户名">
              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="passWord">
              {getFieldDecorator('passWord', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your passWord!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
  }
  
  showModal(e) {
    this.setState({
      visible: true
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((error,values) => {
      if (!error) {
        console.log(1)
        this.props.addUser(values, this.props.history)
      }
    })
  }

  handleCancel(e) {
    this.setState({
      visible: false
    })
  }
} 
export default connect(
  null,
  dispatch => {
    return {
      addUser: (values, history) => {
        dispatch({
          type: 'userManage/addUserSync',
          payload: values,
          history,
        })
      }
    }
  }
)(Form.create(null)(AddMask));


