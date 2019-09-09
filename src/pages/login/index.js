import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="card my-5">
              <div class="card-body">
                <h1 class="my-5 display-4">Login</h1>

                <div>
                  <div class="form-group">
                    <label htmlFor="username">用户名</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="请输入用户名"
                    />
                  </div>

                  <div class="form-group">
                    <label htmlFor="password">密码</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="请输入密码"
                    />
                  </div>

                  <button className="btn btn-primary btn-block my-4">登录</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
