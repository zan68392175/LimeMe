/**
 * Routes:
 *  - ./src/layouts/SimpleLayout.js
 */

import React from 'react';
import { Form, Input, Select, Button, Upload, Icon, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

// 图片上传
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

// setMe组件
class setMe extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    value: null,
    loading: false,
  };

  handleChange = info => {
    console.log(info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  //所有数据验证成功后的事件
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let ming = JSON.parse(window.sessionStorage.getItem('user')).username;
        console.log(ming);
        values.name = ming;
        //获取所有的个人信息
        axios.get('http://localhost:9090/userinfo').then(respone => {
          let value = respone.data;
          let isTrue = value.find(item => {
            if (item.name === ming) {
              return item;
            }
          });
          console.log(isTrue);
          if (isTrue) {
            console.log('修改');
            axios.patch(`http://localhost:9090/userinfo/${isTrue.id}`, values);
          } else {
            console.log('添加');
            axios.post(`http://localhost:9090/userinfo`, values);
          }
        });
        // this.props.history.replace('/me/getMe');
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    // 图片上传的方法
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="身份证号码">
          {getFieldDecorator('cardId', {
            rules: [
              { type: 'string' },
              // {
              //   pattern: /^[1-9]d{7}((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])d{3}$|^[1-9]d{5}[1-9]d{3}((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])d{3}([0-9]|X)$/,
              //   message: '请输入正确的身份证号码!',
              // },
              {
                required: true,
                message: '必填！',
              },
            ],
          })(<Input style={{ width: '50%' }} />)}
        </Form.Item>

        <Form.Item label="电话号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入你的电话号码！' }, { len: 11 }],
          })(<Input addonBefore={prefixSelector} style={{ width: '50%' }} />)}
        </Form.Item>

        <Form.Item label="QQ">
          {getFieldDecorator('qq', {
            rules: [
              { type: 'string' },
              {
                max: 12,
                message: '输入正确QQ！',
              },
              {
                min: 6,
                message: '输入正确QQ！',
              },
              {
                required: true,
                message: '必填！',
              },
            ],
          })(<Input style={{ width: '50%' }} />)}
        </Form.Item>

        <Form.Item label="毕业院校">
          {getFieldDecorator('school', {
            rules: [
              { type: 'string' },
              {
                required: true,
                message: '必填！',
              },
            ],
          })(<Input style={{ width: '50%' }} />)}
        </Form.Item>

        <Form.Item label="学历">
          {getFieldDecorator('xueli', {
            rules: [
              { type: 'string' },
              {
                required: true,
                message: '必填！',
              },
            ],
          })(<Input style={{ width: '50%' }} />)}
        </Form.Item>

        <Form.Item label="家庭地址">
          {getFieldDecorator('adress', {
            rules: [
              { type: 'string' },

              {
                required: true,
                message: '必填！',
              },
            ],
          })(<Input style={{ width: '50%' }} />)}
        </Form.Item>

        {/* 图片上传 */}
        <Upload
          name="avatar"
          listType="picture-card"
          className="http://localhost:8000/userinfo"
          showUploadList={false}
          action=""
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            完成
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create(null)(setMe);
