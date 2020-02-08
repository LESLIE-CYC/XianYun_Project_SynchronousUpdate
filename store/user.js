//这里是uveX 
export const state =()=> {
    // name:'你好啊'
    //返回一个函数对象，优化作用
   return{
    userInfo: {
        user:{}
    },
   }
}
export const mutations = {
    setUserInfo(state, data){
        state.userInfo = data;
    },
}