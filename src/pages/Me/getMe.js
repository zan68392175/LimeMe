/**
 * Routes:
 *  - ./src/layouts/SimpleLayout.js
 */

import React from 'react';
import styles from './getMe.scss';
import { DatePicker, Button } from 'antd';
import Card from '../../layouts/components/Card/card';
import axios from 'axios';

class GetMe extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    userinfo: null,
  };

  getData() {
    let ming = JSON.parse(window.sessionStorage.getItem('user')).username;
    axios.get(`http://localhost:9090/userinfo`).then(respone => {
      let data = respone.data;
      data.map(item => {
        if (item.name === ming) {
          this.setState({
            userinfo: item,
          });
        }
      });
    });
  }

  //挂载完成
  componentDidMount() {
    this.getData();
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };
  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div className={styles.page_getMe}>
        {/* 个人信息 */}
        <div className={styles.page_getMe_top}>
          <div className={styles.jieshao}>
            <div className={styles.jieshao_top}>
              <div className={styles.avatar}>
                <img
                  src="https://img02.sogoucdn.com/net/a/04/link?appid=100520040&url=https://i01piccdn.sogoucdn.com/3c28af542f2d49f7-9e7c5d699eaea93e-1fd71f572c9c8db807d40d2348b813d3_qq"
                  alt=""
                />
              </div>
            </div>
            <div className={styles.jieshao_bot}>
              <h5>{this.state.userinfo ? this.state.userinfo.name : 'xxx'}</h5>
              <h6>设计团队负责人</h6>

              <div>
                <span>打卡</span>
                <span>补卡</span>
              </div>
            </div>
          </div>
          {/*个人资料卡片*/}
          <div>
            <Card prop={this.state.userinfo}></Card>
          </div>
        </div>

        {/* 员工请假 */}
        <div className={styles.leave}>
          <div className={styles.leave_top}>员工请假</div>
          <div className={styles.leave_bot}>
            <div>
              <p>请假原因</p>
              <textarea name="请假原因"></textarea>
            </div>
            <div>
              <p>请假时间</p>
              <div>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  showTime
                  format="YYYY-MM-DD"
                  value={startValue}
                  placeholder="Start"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  showTime
                  format="YYYY-MM-DD"
                  value={endValue}
                  placeholder="End"
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
                <Button type="primary" className={styles.ant_btn}>
                  提交
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetMe;
