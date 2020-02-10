//这里是uveX 
export const state = () => {
  //返回一个函数对象，优化作用
  return {
    userInfo: {
      user: {}
    },
  }
}
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
}
//固定的属性，异步修改state中的值
export const actions = {
  //和网易那些是一样子，多个不同的邮箱都可以登录一个帐号
  login(store, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then(res => {
      // console.log(res.data)
      const {
        data
      } = res;
      console.log(data)
      //这里是把数据存到那个store里面去的
      store.commit('setUserInfo', data);

    })
  },
  //注册方法
  register(store, data) {
    return this.$axios({
      url: "/accounts/register",
      method: 'POST',
      data
    }).then(res=>{
       const {data}=res
       // 调用commit保存数据到state
       store.commit('setUserInfo', data);
    })
  },

}
