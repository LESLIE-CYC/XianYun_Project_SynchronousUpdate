<template>
  <div class="gaoDeMap">
    <div class="container">
      <div class="search-box">
        <input v-model="searchKey" type="search" id="search" />
        <button @click="searchByHand">搜索</button>
        <div class="tip-box" id="searchTip"></div>
      </div>
      <el-amap
        class="amap-box"
        :amap-manager="amapManager"
        :vid="'amap-vue'"
        :zoom="zoom"
        :plugin="plugin"
        :center="center"
        :events="events"
      >
        <!-- 标记 -->
        <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //注☛：高德地图•自定义•方法
    initSearch() {
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: "search",
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip"
        });
        vm.poiPicker = poiPicker;
        // 监听poi选中信息
        poiPicker.on("poiPicked", function(poiResult) {
          // console.log(poiResult)
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            poiPicker.clearSearchResults();
            vm.markers = [];
            let lng = poi.location.lng;
            let lat = poi.location.lat;
            let address = poi.cityname + poi.adname + poi.name;
            vm.center = [lng, lat];
            vm.markers.push([lng, lat]);
            vm.lng = lng;
            vm.lat = lat;
            vm.address = address;
            vm.searchKey = address;
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey !== "") {
        this.poiPicker.searchByKeyword(this.searchKey);
      }
    }
  }
};
</script>


<style lang="less" scoped>
 //注☛：高德地图•样式设置
.container {
  width: 500px;
  height: 450px;
  transform: translate3d(-50%, -50%, 0);
  border: 1px solid #999;
}
.search-box {
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}
.search-box {
  input {
    width: 80%;
    height: 100%;
    border: 1px solid #30ccc1;
    padding: 0 8px;
    outline: none;
  }
}
.search-box {
  button {
    float: left;
    width: 20%;
    height: 100%;
    background: #30ccc1;
    border: 1px solid #30ccc1;
    color: #fff;
    outline: none;
  }
}
.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}
</style>
