/**
 * title: '用户管理'
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
// import AddMask from './addMask'
import { Table, Divider, Modal, Button, Form, message, Input } from 'antd';
import styles from './index.scss'
import request from '../../utils/request'

class Mask extends Component {
  state = { 
    mask: false,
    data: null,
    show: false,
    visible: false,
    pa: 1,
    pz: 10
  }

  render () {

    const { getFieldDecorator } = this.props.form;

    return (
      <Fragment>
        <Button type={this.props.type} onClick={this.buttonClick.bind(this,this.props.data)}>
          {this.props.title}
        </Button>
        <Modal
          title={this.props.title}
          visible={this.state.mask}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          okText="确认"
          cancelText="取消"
        >
          {
            this.state.show ? <p>是否删除</p> 
            :
            <Form className={styles.login_form}>
              <Form.Item label="用户名">
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your userName!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input disabled />)}
              </Form.Item>
            </Form>
            
          }
        </Modal>
      </Fragment>
    )
  }

  componentDidMount () {
    this.setState({
      pa: this.props.data.newData.pa,
      pz: this.props.data.newData.pz,
    })
  }

  // 修改删除
  buttonClick (data) {
    
    if (this.props.title === "删除") {
      this.setState({
        show: true
      })
    }else{
      this.setState({
        show: false
      })
      this.props.form.setFieldsValue({
        username: this.props.data.record.username,
        email: this.props.data.record.email
      })
    }
    this.setState({
      mask: true,
      data: data,
    })
  }

  handleOk () {
    if (this.props.title === "删除") {
      request.delete(`/api/v1/users/${this.state.data.record.id}`)
      .then(res => {
        if (res.code === 0) {
          this.props.data.newData.getUserList(this.state.pa,this.state.pz)
          this.setState({
            mask: false,
          })
        }
      })
    } else{
      this.props.form.validateFields ((error, values) => {
        if (!error) {
          request.patch(`/api/v1/users/${this.state.data.record.id}`,{
            username: values.username
          }).then(res => {
            if (res.code === 0) {
              message.success('修改成功');
              this.props.data.newData.getUserList(this.state.pa,this.state.pz)
              this.setState({
                mask: false,
              })
            }
          })
        }
        
      })
    }
  }

  handleCancel() {
    this.setState({
      mask: false
    })
  }

}

Mask = Form.create(null)(Mask)

// 大组件
class UserManage extends Component {
  state = { 
    visible: false
  };

  render() {

    const columns = [
      { title: '用户Id', dataIndex: 'id' },
      { title: '用户名', dataIndex: 'username' },
      { title: '用户邮箱', dataIndex: 'email' },
      { title: '创建时间', dataIndex: 'created_at' },
      { title: '操作', dataIndex: '', render: (text, record) => (
        <span>
          <Mask title='修改' type="primary" data={{record,newData:this.props}}></Mask>
          <Divider type="vertical" />
          <Mask title='删除' type="danger" data={{record,newData:this.props}}></Mask>
        </span>
        ), 
      }
    ];

    const { getFieldDecorator } = this.props.form;
    
    return (
      <div className={styles.wrap}>
        <h1>用户管理页面</h1>
        
        <div className={styles.add}>
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
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={this.props.userList}
          pagination={{
            position: 'bottom',
            total: this.props.total,
            onChange: this.props.getUserList,
          }}
        ></Table>

        
      </div>
      
    );
  }

  componentDidMount() {
    this.props.getUserList();
    
  }

  // 添加浮层
  showModal(e) {
    this.setState({
      visible: true
    })
  }
  
  // 确定添加请求
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((error,values) => {
      if (!error) {
        request.post('/api/v1/signup', {
          username: values.userName,
          email: values.email,
          password: values.passWord
        }).then(res => {
          if (res.code === 0) {
            message.success('添加成功');
            this.setState({
              visible: false
            })
            this.props.getUserList();
          }
        })
      }
    })
  }

  // 关闭浮层
  handleCancel(e) {
    this.setState({
      visible: false
    })
  }
}

export default connect(
  ({ userManage }) => {
    return {
      userList: userManage.userList,
      total: userManage.total,
      pa: userManage.pa,
      pz: userManage.pz,
    };
  },
  dispatch => {
    return {
      /**
       * 获取用户列表或分页切换时
       * @param {Number} page 页码
       * @param {Number} pageSize 每页显示的条数
       */
      getUserList(page, pageSize) {
        dispatch({
          type: 'userManage/getUserList',
          page,
          pageSize,
        });
      }
      
    };
  },
)(Form.create(null)(UserManage));
