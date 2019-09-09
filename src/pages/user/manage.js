/**
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

const columns = [
  { title: '用户Id', dataIndex: 'id' },
  { title: '用户名', dataIndex: 'username' },
  { title: '用户邮箱', dataIndex: 'email' },
  { title: '创建时间', dataIndex: 'created_at' },
];

class UserManage extends Component {
  render() {
    return (
      <div>
        <h1>用户管理页面</h1>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={this.props.userList}
          pagination={{
            position: 'top',
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
}

export default connect(
  ({ userManage }) => {
    return {
      userList: userManage.userList,
      total: userManage.total,
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
      },
    };
  },
)(UserManage);
