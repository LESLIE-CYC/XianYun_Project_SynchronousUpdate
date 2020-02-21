<template>
  <!-- 轮播图区域 -->
  <div>
    <el-carousel height="700px" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner"
          :style="`background:url(${item})center center no-repeat;
         background-size:100%`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item,index) in options"
            :key="index"
            @click="tabClick(index)"
            :class="{active: current ===index}"
          >
            <i>{{item.text}}</i>
          </span>
        </el-row>
        <!-- 三个小的•输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="options[current].placeholder" />
          <i class="el-icon-search" @click="searchClick"></i>
          <!-- A.2点击搜索图标后跳转到酒店页面 搜索-->
        </el-row>

        <!-- 城市下拉•可选择按•国内热门•ABCD字母•国际等这个城市，当用户鼠标的光标聚焦在输入框里面时 -->
        <!-- 注：这时只是想做这么一个效果，反台可能并没相关的城市的数据 -->
        <!--城市下拉列表  -->
        <div class="cityDropDownList">
          <el-tabs type="border-card" v-model='townName'>
            <el-tab-pane label="热门城市" @click='handleClick'
             name="townName"
             v-for="(item) in townList" 
             :key="item.type">
             <div v-for="v in item.children" :key='v.city'>{{v.desc}}</div>
            </el-tab-pane>
            <el-tab-pane label="推荐城市" @click='handleClick'>配置管理</el-tab-pane>
            <el-tab-pane label="奔向海岛" @click='handleClick'>角色管理</el-tab-pane>
            <el-tab-pane label="主题推荐" @click='handleClick'>定时任务补偿</el-tab-pane>
            <el-tab-pane label="港澳台" @click='handleClick'>定时任务补偿</el-tab-pane>
            <el-tab-pane label="国际" @click='handleClick'>定时任务补偿</el-tab-pane>
            <el-tab-pane label="已去过" @click='handleClick'>已去过城市记录：</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      townList:{},
      townName: "second",
      banners: [
        "http://157.122.54.189:9095/assets/images/th01.jfif",
        "http://157.122.54.189:9095/assets/images/th02.jfif",
        "http://157.122.54.189:9095/assets/images/th03.jfif",
        "http://157.122.54.189:9095/assets/images/th04.jfif"
      ],
      //搜索栏数据区域
      options: [
        {
          text: "攻略",
          placeholder: "请搜索你心目中梦幻迷离般的旅游胜地吧！"
        },
        {
          text: "酒店",
          placeholder: "请输入你想入住酒店的城市名称•例如:北京市?"
        },
        {
          text: "订票",
          placeholder: ""
        }
      ],
      current: 0,
      //景点 城市 ，展示在酒店的搜索的区域位置
      guangzhou:[{
        scenics:[],
      }],
      total:100,
    };
    console.log('guangzhou')
  },
  mounted(){
    this.$axios({
      url:"/posts/cities",
    }).then(res =>{
      console.log(res)
    })
  },

  methods: {
    tabClick(index) {
      //进行判断然后跳转到国内机票页面
      if (index === 2) {
        this.$router.push("/air");
      }
      this.current = index;
    },
    //点击ico搜索图标功能•跳转到酒店页面  A.1--searchClick：搜索点击
    searchClick() {
      this.$router.push("/hotel"); //A.3--点击搜索图标时能跳转到酒店首页•功能1完成
    },
  }
};
</script>

<style scope lang="less">
.banner {
  height: 700px;
}
.banner-content {
  //注：要使用这个 /deep/ 可以改组件的样式，不是使用.class不可以的•方法是：在element组件的外面包一个div盒子
  .cityDropDownList/deep/{
     margin-top:3px;
  }
  z-index: 9;
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  border-top: 1px transparent solid;
  .search-bar {
    width: 552px;
    margin: 0 auto;
  }
  .search-tab {
    .active {
      i {
        color: #333;
      }
      &::after {
        background: #eee;
      }
    }
    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;
      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
  }
  .search-input {
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;
    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none;
      border: 0;
      font-size: 16px;
    }
    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
</style>