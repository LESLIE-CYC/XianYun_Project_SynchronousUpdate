<template>
  <!-- 注☛：这个是酒店首页页面 -->
  <div class="hotelHome">
    <!-- 注☛：酒店面包屑•模板区域 -->
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>广州预定酒店</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 注☛：头部导航栏•栅格栏布局 -->
    <el-row :gutter="50">
      <!-- 注☛：切换城市•模板区域 -->
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <div class="changeCity">
            <el-input v-model="input" placeholder="切换城市"></el-input>
          </div>
        </div>
      </el-col>
      <!-- 注☛：双日期选择•模板区域 -->
      <div class="doubleDates">
        <el-col :span="6">
          <div class="grid-content">
            <div class="block">
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
      </div>
      <!-- 注☛：未选人数•模板区域 -->
      <div class="numberNotSelected">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="uncertain">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="state3"
                :fetch-suggestions="querySearch"
                placeholder="人数未定"
                @select="handleSelect"
              >
                <i class="el-icon-user-solid el-input__icon" slot="suffix" @click="handleIconClick"></i>
                <template slot-scope="props">
                  <div class="name">{{ props.item.value }}</div>
                  <span class="addr">{{ props.item.address }}</span>
                </template>
              </el-autocomplete>
            </div>
          </div>
        </el-col>
      </div>
      <!-- 注☛：查看价格•模板区域 -->
      <div class="checkThePrice">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search">查看价格</el-button>
          </div>
        </el-col>
      </div>
    </el-row>
    <!-- 注☛：左右布局的容器•模板区域 -->
    <div class="layoutContainer">
      <el-container>
        <!-- 注☛：可折叠面板•布局容器•左边•模板区域 -->
        <div class="accordionLeft">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="☛点击展开☛详细区域：" name="1">
              <div>定位：</div>
              <div class="inCommonUse">
                <a href="http://">人民广场</a>
                <a href="http://">城市镇</a>
                <a href="http://">奉贤区</a>
                <a href="http://">金山区</a>
                <a href="http://">建设镇</a>
                <a href="http://">三星镇</a>
                <a href="http://">新河镇</a>
                <a href="http://">通河镇</a>
                <a href="http://">通河</a>
                <a href="http://">堡镇</a>
                <a href="http://">绿华镇</a>
                <a href="http://">南门</a>
                <a href="http://">黑马程序员</a>
                <a href="http://">吉山村</a>
              </div>
            </el-collapse-item>
            <el-collapse-item title="☛点击展开☛--更多区域:" name="2">
              <div class="stillMore">
                <a href="http://">人民广场</a>
                <a href="http://">城市镇</a>
                <a href="http://">奉贤区</a>
                <a href="http://">金山区</a>
                <a href="http://">建设镇</a>
                <a href="http://">三星镇</a>
                <a href="http://">广州天河广场</a>
                <a href="http://">广州•黑马程序员</a>
                <a href="http://">吉山村</a>
              </div>
            </el-collapse-item>
            <el-collapse-item title="☛点击展开☛看一下其它网友对均价评分： ★★★★★ + 点赞 ♕♕♕♕♕" name="3">
              <div class="grade">
                <!-- 注☛：用户评分•第一种价格•模板区域 -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="温馨提示：等级评定是针对房价，设施和服务等方面水平的综合评价"
                  placement="top"
                >
                  <el-button>
                    <div>
                      你评分一下？
                      <span>均价：￥ 332</span>
                    </div>
                    <el-rate v-model="value3" show-text></el-rate>
                  </el-button>
                </el-tooltip>
                <!-- 注☛：用户评分•第二种价格•模板区域 -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="温馨提示：等级评定是针对房价，设施和服务等方面水平的综合评价"
                  placement="top"
                >
                  <el-button>
                    <div>
                      你评分一下？
                      <span>均价：￥ 521</span>
                    </div>
                    <el-rate v-model="value3" show-text></el-rate>
                  </el-button>
                </el-tooltip>
                <!-- 注☛：用户评分•第三种价格•模板区域 -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="温馨提示：等级评定是针对房价，设施和服务等方面水平的综合评价"
                  placement="top"
                >
                  <el-button>
                    <div>
                      你评分一下？
                      <span>均价：￥ 768</span>
                    </div>
                    <el-rate v-model="value3" show-text></el-rate>
                  </el-button>
                </el-tooltip>
              </div>
            </el-collapse-item>
            <el-collapse-item title="☛点击展开☛世界著明酒店☛图片集☛✳✳✳✳✳✳" name="4">
              <div>世界酒店预览☛：以下的图片为最新摄影❤↕⇲来自官方摄影↕⇱❤</div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <!-- 注☛：高德地图•布局容器•右边•模板区域 -->
        <el-main>
          <!-- <div>高德地图:最懂你心思的小助手哦！</div> -->
          <VueMap></VueMap>
        </el-main>
      </el-container>
    </div>
    <!-- 注☛:轮播图•展示酒店•广告专用 -->
    <div class="block">
      <span class="demonstration">❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤闻文于世界的☛世界酒店排名☛广告栏专用☛黑马程序员❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤</span>
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import VueMap from "@/components/map/vue-map.vue";
export default {
  data() {
    return {
      //注☛：切换城市•数据返回区域
      input: "",
      //注☛：双日期选择•数据返回区域
      value6: "",
      // 注☛：未选人数•数据返回区域
      restaurants: [],
      state3: "",
      //注☛：详细定位地理位置•数据返回区域
      activeNames: ["1"],
      //注☛：让用户评分•数据返回区域
      value3: null
    };
  },
  components: {
    VueMap
  },
  methods: {
    tabClick(index) {
      //注☛：进行判断然后跳转到国内机票页面
      if (index === 2) {
        this.$router.push("/air");
      }
      this.current = index;
    },
    //注☛：点击ico搜索图标功能•跳转到酒店页面
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    //注☛：未选人数方法•区域
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //注☛：详细定位地理位置•自定义方法
    handleChange(val) {
      console.log(val);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" }
      ];
    },

    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    beforeDestroy() {}
  }
};
</script>
<style lang="less" scoped>
//注☛：酒店面包屑•样式区域
.hotelHome {
  max-width: 1000px;
  margin: 0 auto;
  .crumbs/deep/.el-breadcrumb {
    margin: 15px 0;
    font-weight: 400px;
    font-size: 16px;
  }
  //注☛：栅格布局•样式区域
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  //注☛：切换城市•样式区域
  .changeCity/deep/.el-input {
    width: 227px;
  }
  //注☛：双日期•样式区域
  .doubleDates/deep/.el-col {
    .block {
      margin: 0 20px;
    }
  }
  //注☛：未选人数•样式区域
  .numberNotSelected/deep/.el-col {
    .grid-content {
      margin-left: 115px;
    }
  }
  .uncertain/deep/.el-autocomplete {
    width: 280px;
  }
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }
      .highlighted .addr {
        color: #ddd;
      }
    }
  }
  //注☛：查看价格•样式区域
  .checkThePrice/deep/.el-col {
    margin-left: 150px;
    width: 120px;
  }
  //注：☛容器布局•样式区域
  .layoutContainer/deep/.el-container {
    .accordionLeft {
      width: 50%;
    }
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  //注☛用户评分•样式区域
  .top {
    text-align: center;
  }
  //注☛轮播图•广告专用•样式区域
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
