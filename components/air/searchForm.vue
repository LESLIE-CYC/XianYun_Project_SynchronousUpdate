<template>
  <div class="search-form">
    <!-- 头部tab拦的切换区域 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>
        {{ item.name }}
      </span>
    </el-row>
    <!-- 出发城市/到达城市/出发时间区域 -->
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- 出发城市区域 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="handleDepartBlur"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <!-- 到达城市区域 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          @blur="handleDestBlur"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <!-- 出发时间区域 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          :picker-options="pickerOptions"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <!-- 搜索功能区域 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0, //tab值的切换
      //表单里面的字段数据
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", //到达城市代码
        departDate: "" //出发日期
      },
      //这里是出发城市的数据列表
      departData: [],
      //这里是到达城市的数据列表
      destData: [],
      //日期相关配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index == 1) {
        this.$alert(
          "亲,不能点击这里哦！这个页面是还没做完的！下次记得不要再点了哦",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning"
          }
        );
      }
    },
    //在这querySearch函数区域封装下面的根据value的返回数据向后台发出请求
    querySearch(value) {
      //根据value的返回数据向后台发出请求，别忘了这里是要提取出来封装好的，又忘记封装了
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        //给每个data中都加了一个value属性
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        return newData;
        //callback是数据后台返回新的数据
        // callback(newData);
      });
    }, 
   

    /* 结构学习注意点：
              多用鼠标点击一个函数区域先把结构看懂，不要急着只想看到结果，日后错了也不知错在那里
              现在的慢就是为了以后的快，学习是急不来的，不要怕错，现在多错了，要学会找出错误来，总结
              怎么解决结构的问题，只有不看别人的代码能自已写的出来才是真会，多学习封装函数，多去尝试着封装
              就当玩浏览器插件一样的感觉就好了，总会是有学会的一天，急不来，基础太差，没法子，一步
              一步的来
    */
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，callback回调函数，接收要展示城市的列表
    queryDepartSearch(value, callback) {
      if (!value) {
        this.departData = [];
        //修复用户光标未输入状态组件样式在缓冲bug
        callback([]);
        return;
      }
        //现在开始调用这个封装好的函数代码，两个向axios请求都是要的
      this.querySearch(value).then(newData=>{
        this.destData=newData;
        callback(newData)
      })
      //根据value的返回数据向后台发出请求 【这里一样子是要封装的】
      /* this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        //给每个data中都加了一个value属性
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        //把newData保存到data里面去
        // this.departData = newData;

        //callback是数据后台返回新的数据
        callback(newData);
      }); */
    },
    //出发城市输入框失去焦点时候就会触发
    //handle:处理 Depart:消失 Blur:焦点
    handleDepartBlur() {
      if (this.departData.length === 0) {
        return;
      }
      this.form.departCity = this.departData[0].value;
      this.form.departCode = this.departData[0].sort;
    },

    //到达城市输入框失去焦点时候就会触发
    //handle:处理 Depart:消失 Blur:焦点
    handleDestBlur() {
      if (this.destData.length === 0) {
        return;
      }
      // 默认获取数组中第一个城市
      this.form.destCity = this.destData[0].value;
      this.form.destCode = this.destData[0].sort;
    },
    // 监听到达城市输入框的事件
    //query:监听 Dest：到达  Search:搜索
    queryDestSearch(value, callback) {
      if (!value) {
        this.destData = [];
        //修复用户光标未输入状态组件样式在缓冲的一样子的感觉
        callback([]);
        return;
      }
       //现在开始调用这个封装好的函数代码，两个向axios请求都是要的
      this.querySearch(value).then(newData=>{
        this.departCity=newData;
        callback(newData)
      })
      //又忘记封装了：根据value的返回数据向后台发出请求，看上面的封装，别忘了这里是要提取出来封装好的，
   /*    this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        //给每个data中都加了一个value属性
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        //把到 【redchData:到达城市】保存到newData数据库里面去
        this.destData = newData;
        //callback是数据后台返回新的数据
        callback(newData);
      }); */
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发，就是那个换字
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      //判断用户是否输入
      if (!this.form.departCity) {
        this.$message.error("请输入出发城市");
        return;
      }
      if (!this.form.destCity) {
        this.$message.error("请输入到达城市");
        return;
      }
      if (!this.form.departDate) {
        this.$message.error("请选择时间");
        return;
      }
      this.$router.push({
        path: "/air/flights",
        // query是url的参数
        query: this.form
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
