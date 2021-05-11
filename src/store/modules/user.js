import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken()
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    // 进行本地存储
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  }
}
const actions = {
  async login(store, data) {
    // 发请求
    const res = await login(data)
    // 登录成功
    if (res.data.success) {
      store.commit('setToken', res.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
