import request from '../utils/request';

export default {
  namespaced: 'userManage',

  state: {
    userList: [],
    total: 1, // 用户的总条数
    // 二次调用用户页码
    pa: 1,
    pz: 10,

  },

  reducers: {
    setUserList(state, action) {
      return {
        ...state,
        ...{
          userList: action.userList,
          total: action.total,
          pa: action.pa,
          pz: action.pz
        },
      };
    },
  },

  effects: {
    *getUserList(action, { put }) {
      const result = yield request.get('/api/v1/users', {
        params: {
          page: action.page || 1,
          limit: action.pageSize || 10,
        },
      });
      yield put({
        type: 'setUserList',
        userList: result.users.data,
        total: result.users.total,
        pa: result.users.page,
        pz: result.users.perPage
      });
      console.log(result)
    },
  },
};
