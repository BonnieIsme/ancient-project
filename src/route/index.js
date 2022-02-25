// 创建整个应用的路由器
import VueRouter from 'vue-router'
import MainBox from '../pages/MainBox.vue'
// import MainLayout from '../components/MainLayout.vue'

const router =  new VueRouter({
  routes:[
    {
      path: '/:address?/:city?/:district?',
      component: MainBox,
      // meta: {
      //   // 路由元信息，可以放自定义的属性
      //   isAuth:false // 该路由是否要进行鉴权
      // },
      // 独享守卫 —— 每个路由独有的守卫
      // beforeEnter: (to, from, next) => {
      //   // 只有独享前置，没有独享后置
      // }
    }
  ],
  // mode:'history'
})

// 路由守卫

// 全局前置路由守卫
// 初始化时被调用，每次路由切换之前被调用
// router.beforeEach((to,from,next) => {
//   console.log('全局前置守卫——被调用');
//   console.log(to); // 目标路由
//   console.log(from); // 起点路由
//   if (!to.meta.isAuth) {
//     next() // 放行 —— 可以根据条件是否判断
//   }
  
// })

// 全局后置守卫
// 初始化时被调用，每次路由切换之后被调用
// router.afterEach((to,from) => {
//   console.log(to);
//   console.log(from);
// })


export default router