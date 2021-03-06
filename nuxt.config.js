export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    //修改1：url标题名称
    title: '驴友部落 | 官方网站',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      //修改2：增加全局字体的样式
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css'
      } // 新增全局字体样式
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    //修改3：新增自定义的页面过渡样式
    'assets/main.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    //高德地图☛插件配置
    // '~/plugins/vue-map',
    '@/plugins/element-ui',
    {
      src: '@/plugins/localStorage',
      ssr: false
    }

  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: "http://157.122.54.189:9095" // 新增线上备用的地址•后台数据库挺好玩的
    //修改4:新增axios默认请求路径           
    baseURL: "http://127.0.0.1:1337" //本地服务器的地址•后台数据库挺好玩的	
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  //高德地图
  script: [{
    src: "http://webapi.amap.com/maps?v=1.4.4&key='8b78fa9fc97b91d14edad8d3e6cd4726'"
  }, ],
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder']
}
