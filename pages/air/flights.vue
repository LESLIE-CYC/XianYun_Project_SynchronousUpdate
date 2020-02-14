<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件区域，就是过滤 -->
        <!-- 3.3使用条件过滤布局的组件 -->
        <!-- 注意： 在父组件中的 :data="flightsData"的数据绑定就相当是子组件那边传过来的数据了↔↔↔然后呢：
                    父组件中的通return(返回数据) 就相当于接收了子组件从那边传过来了，好神奇的样子哦 -->
        <FlightsFilters :data="flightsData" @getData="getData"></FlightsFilters>
        <!-- 航班头部布局 -->
        <div>
          <!-- 1.3使用列表头部组件 -->
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
        <!-- 2.3使用机票列表组件组件-->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item"></FlightsItem>
        <!-- 分页组件区域  未知这个有什么用处" @size-change="handleSizeChange -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
/**
 * 注意：老师说这个变量名的命名规则为统一使用每个单词首字母是大写来开头，这个是行业内的一个统一的标准， 
 *      这个很重要，这样子也是有很多好处的，的确是这样子。
 */
//1.1引入列表头部组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
//2.1引入机票列表组件组件
import FlightsItem from "@/components/air/flightsItem.vue";
//3.1引入条件过滤布局的组件
import FlightsFilters from '@/components/air/flightsFilters.vue'

export default {
  // props:['data']，如果用这个就是表明是不声明，没有使用，就是报错的，可以用对象的方法
data(){
  return{
      type: Object,

      flightsData: {
        info: {},
        options: {},
      },
      // 当前页数
      pageIndex: 1,
      // 当前的条数
      pageSize: 5,
      // 总条数
      total: 0  
  }
},
  components: {
    //1.2注册列表头部组件 2.2注册机票列表组件组件 3.2注册条件过滤布局的组件 
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
 
  },
  computed: {
    dataList() {
      //判断flightsData有没有值
      if (!this.flightsData.flights) {
        return [];
      }
      //这里的第一页面是0-5数据，第二页是5-10的数据，第三页是10-15的数据
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
      //这里是机票的总数据，下分别有四个属性：info flights total options
      /**
       * 本地服务器返回的数据为Array(8)对象   线上服务器返回是Array(100)对象
       * .data.data返回的数据有4个属性分别为：
       * info:作用是：过虑筛选条件是展示用的
       * flights:作用是：循环出当前页面航空公司返回的真实数据列表
       * total: 作用是：拿到当前的数据到底有多少条显示在当前的页面在
       * options：作用是：过虑的条件
       * */
 
  mounted() {
    //向后台请求机票的真实列表数据
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      //这里先打印一下看看后台给我们返回的真实数据
      //返回了【总数据】就保存起来用
      this.flightsData = res.data;
      console.log(res);
      //这里是修改总的条数
      this.total = this.flightsData.total;
    });
  },
  methods: {
    //这里是切换【条数】的时候触发了的事件
    handleSizeChang(index) {},
    //这里是切换【页数】的时候触发了的事件
    handleCurrentChange(index) {
      //这时是可以打印出数据开看一下
      console.log(index);
      this.pageIndex = index;
    },
    //自定义获取到组件的过滤后的数组
    getData(array){
      this.flightsData.flights= array
      console.log(array)
    }
    
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