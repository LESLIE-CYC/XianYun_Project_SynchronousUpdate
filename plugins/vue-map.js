import Vue from 'vue';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

// 初始化vue-amap
if (!Vue.prototype.$isServer) {
  VueAMap.initAMapApiLoader({
    // 高德的key
    key:'8b78fa9fc97b91d14edad8d3e6cd4726',
    // 插件集合
    plugin: ['AMap.Geolocation', 'AMap.Marker', 'AMap.ToolBar', 'AMap.Circle', 'AMap.PolyLine'],
    uiVersion: '1.0',
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.8'
  });
}
// import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
let amapManager = new AMapManager()
export default {
  data () {
    let self = this
    return {
      address: null,
      searchKey: '',
      amapManager,
      markers: [],
      searchOption: {
        city: '全国',
        citylimit: true
      },
      center: [121.329402, 31.228667],
      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        init () {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch()
          })
        },
        // 点击获取地址的数据
        click (e) {
          // console.log(e)
          self.markers = []
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.center = [lng, lat]
          self.markers.push([lng, lat])
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                console.log(result.regeocode.formattedAddress)
                self.address = result.regeocode.formattedAddress
                self.searchKey = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      },
      // 一些工具插件
      plugin: [
        {
          pName: 'Geocoder',
          events: {
            init (o) {
              console.log(o.getAddress())
            }
          }
        },
        {
          // 定位
          pName: 'Geolocation',
          events: {
            init (o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng
                  // 设置维度
                  self.lat = result.position.lat
                  // 设置坐标
                  self.center = [self.lng, self.lat]
                  self.markers.push([self.lng, self.lat])
                  // load
                  self.loaded = true
                  // 页面渲染好后
                  self.$nextTick()
                }
              })
            }
          }
        },
        {
          // 工具栏
          pName: 'ToolBar',
          events: {
            init (instance) {
              console.log(instance);
            }
          }
        },
        {
          // 鹰眼
          pName: 'OverView',
          events: {
            init (instance) {
              console.log(instance);
            }
          }
        },
        {
          // 地图类型
          pName: 'MapType',
          defaultType: 0,
          events: {
            init (instance) {
              console.log(instance);
            }
          }
        },
        {
          // 搜索
          pName: 'PlaceSearch',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        }
      ]
    }
  },
  //注☛：高德地图•方法•老师曾说过要放要显示的页面中
  // methods: {
  //   initSearch () {
  //     let vm = this
  //     let map = this.amapManager.getMap()
  //     AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
  //       var poiPicker = new PoiPicker({
  //         input: 'search',
  //         placeSearchOptions: {
  //           map: map,
  //           pageSize: 10
  //         },
  //         suggestContainer: 'searchTip',
  //         searchResultsContainer: 'searchTip'
  //       })
  //       vm.poiPicker = poiPicker
  //       // 监听poi选中信息
  //       poiPicker.on('poiPicked', function (poiResult) {
  //         // console.log(poiResult)
  //         let source = poiResult.source
  //         let poi = poiResult.item
  //         if (source !== 'search') {
  //           poiPicker.searchByKeyword(poi.name)
  //         } else {
  //           poiPicker.clearSearchResults()
  //           vm.markers = []
  //           let lng = poi.location.lng
  //           let lat = poi.location.lat
  //           let address = poi.cityname + poi.adname + poi.name
  //           vm.center = [lng, lat]
  //           vm.markers.push([lng, lat])
  //           vm.lng = lng
  //           vm.lat = lat
  //           vm.address = address
  //           vm.searchKey = address
  //         }
  //       })
  //     })
  //   },
  //   searchByHand () {
  //     if (this.searchKey !== '') {
  //       this.poiPicker.searchByKeyword(this.searchKey)
  //     }
  //   }
  // }
}

