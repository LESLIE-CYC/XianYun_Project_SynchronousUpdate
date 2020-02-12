<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <!-- 1.3使用列表头部组件 -->
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
          <!-- 2.3使用机票列表组件组件 -->
          <FlightsItem
          v-for='(item,index) in flightsData.flights' :key="index" :data='item'>  
          </FlightsItem>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
//1.1引入列表头部组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
//2.1引入机票列表组件组件
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  // props:['data']，如果用这个就是表明是不名明，没有使用，就是报错的，可以用对象的方法
  props:{
    data:{
      type:Object,
      default:{},
    }
  },

  data() {
    return {
      //这里是机票的总数据，下分别有四个属性：info flights total options
      flightsData:{}
      /**
       * 本地服务器返回的数据为Array(8)对象   线上服务器返回是Array(100)对象
       * .data.data返回的数据有4个属性分别为：
       * info:作用是：过虑筛选条件是展示用的
       * flights:作用是：循环出当前页面航空公司返回的真实数据列表
       * total: 作用是：拿到当前的数据到底有多少条显示在当前的页面在
       * options：作用是：过虑的条件
       * */ 
    };
  },
  components: {
    //1.2注册列表头部组件 2.2注册机票列表组件组件
    FlightsListHead,
    FlightsItem
  },
  mounted(){
    //向后台请求机票的真实列表数据
    this.$axios({
      url:'/airs',
      params:this.$route.query
    }).then(res=>{
      //这里先打印一下看看后台给我们返回的真实数据
      //返回了【总数据】就保存起来用
      this.flightsData=res.data;
      console.log(res);
      


    
      
    })
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>